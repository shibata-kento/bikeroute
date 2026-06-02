-- ルートのpolylineと禁止区間を空間照合するRPC関数
-- 引数: route_wkt (LINESTRING WKT文字列), vehicle (vehicle_class)
-- 戻り値: 交差している verified な禁止区間の一覧
create or replace function check_route_restrictions(
  route_wkt text,
  vehicle vehicle_class
)
returns table (
  id uuid,
  road_name text,
  prefecture text,
  description text,
  applies_to vehicle_class[],
  source text,
  start_lat double precision,
  start_lng double precision,
  end_lat double precision,
  end_lng double precision
)
language plpgsql
security definer
as $$
declare
  route_geom geography;
begin
  -- WKT文字列をgeographyに変換
  route_geom := ST_GeogFromText(route_wkt);

  return query
    select
      rs.id,
      rs.road_name,
      rs.prefecture,
      rs.description,
      rs.applies_to,
      rs.source,
      ST_Y(rs.start_point::geometry)::double precision as start_lat,
      ST_X(rs.start_point::geometry)::double precision as start_lng,
      ST_Y(rs.end_point::geometry)::double precision   as end_lat,
      ST_X(rs.end_point::geometry)::double precision   as end_lng
    from restricted_segments rs
    where rs.status = 'verified'
      and rs.applies_to @> ARRAY[vehicle]::vehicle_class[]
      and rs.geometry is not null
      and ST_Intersects(rs.geometry, route_geom);
end;
$$;

-- start_point / end_point から自動でLINESTRINGを補完するトリガー
-- (geometry が null の場合、始点〜終点の直線を補完する)
create or replace function fill_geometry_from_endpoints()
returns trigger language plpgsql as $$
begin
  if new.geometry is null then
    new.geometry := ST_MakeLine(
      new.start_point::geometry,
      new.end_point::geometry
    )::geography;
  end if;
  return new;
end;
$$;

create trigger trg_fill_geometry
before insert or update on restricted_segments
for each row execute function fill_geometry_from_endpoints();
