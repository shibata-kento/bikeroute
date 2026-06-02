-- Enable PostGIS
create extension if not exists postgis;

-- 車種定義
create type vehicle_class as enum ('genki1', 'genki2', 'normal');

-- 禁止区間
create table restricted_segments (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('jmpsa', 'mlit', 'osm', 'user')),
  source_ref text,
  license text, -- 'jmpsa-nc' (非商用限定), 'cc-by', 'odbl', 'cc-by-nc' 等
  applies_to vehicle_class[] not null,
  road_name text,
  prefecture text,
  start_point geography(Point, 4326) not null,
  end_point geography(Point, 4326) not null,
  geometry geography(LineString, 4326),
  description text,
  status text not null default 'pending' check (status in ('pending', 'verified', 'rejected')),
  verification_count int not null default 0,
  created_by uuid references auth.users on delete set null,
  created_at timestamptz not null default now(),
  verified_at timestamptz
);

create index idx_restricted_segments_geom on restricted_segments using gist(geometry);
create index idx_restricted_segments_status on restricted_segments (status);
create index idx_restricted_segments_applies_to on restricted_segments using gin(applies_to);

-- 投稿写真
create table segment_photos (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references restricted_segments on delete cascade,
  storage_path text not null,
  caption text,
  uploaded_by uuid references auth.users on delete set null,
  created_at timestamptz not null default now()
);

-- 確認票
create table verifications (
  id uuid primary key default gen_random_uuid(),
  segment_id uuid not null references restricted_segments on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  vote text not null check (vote in ('confirm', 'dispute')),
  comment text,
  created_at timestamptz not null default now(),
  unique(segment_id, user_id)
);

-- verificationのinsert/update時にverification_countを自動更新するトリガー
create or replace function update_verification_count()
returns trigger language plpgsql as $$
declare
  confirm_count int;
  dispute_count int;
  new_status text;
begin
  select
    count(*) filter (where vote = 'confirm'),
    count(*) filter (where vote = 'dispute')
  into confirm_count, dispute_count
  from verifications
  where segment_id = coalesce(new.segment_id, old.segment_id);

  if confirm_count >= 3 and confirm_count > dispute_count then
    new_status := 'verified';
  elsif dispute_count > confirm_count then
    new_status := 'rejected';
  else
    new_status := 'pending';
  end if;

  update restricted_segments
  set
    verification_count = confirm_count,
    status = new_status,
    verified_at = case when new_status = 'verified' and status != 'verified' then now() else verified_at end
  where id = coalesce(new.segment_id, old.segment_id);

  return new;
end;
$$;

create trigger trg_update_verification_count
after insert or update or delete on verifications
for each row execute function update_verification_count();

-- RLS
alter table restricted_segments enable row level security;
alter table segment_photos enable row level security;
alter table verifications enable row level security;

-- 閲覧: verified + pendingは全員、rejectは作成者のみ
create policy "segments_select" on restricted_segments
  for select using (
    status in ('verified', 'pending')
    or created_by = auth.uid()
  );

-- 投稿: ログインユーザーのみ
create policy "segments_insert" on restricted_segments
  for insert with check (auth.uid() is not null and source = 'user');

-- 写真: 閲覧は全員(verifiedなsegmentに紐づくもの)
create policy "photos_select" on segment_photos
  for select using (
    exists (
      select 1 from restricted_segments s
      where s.id = segment_photos.segment_id
        and s.status in ('verified', 'pending')
    )
  );

create policy "photos_insert" on segment_photos
  for insert with check (auth.uid() is not null);

-- 確認票: ログインユーザーのみ投票、閲覧は全員
create policy "verifications_select" on verifications
  for select using (true);

create policy "verifications_insert" on verifications
  for insert with check (auth.uid() = user_id);

create policy "verifications_update" on verifications
  for update using (auth.uid() = user_id);
