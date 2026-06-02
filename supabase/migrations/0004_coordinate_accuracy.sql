-- 座標精度フラグ
-- 'exact'       : 番地レベルのジオコーディング成功
-- 'municipality': 市区町村代表点（概算）
alter table restricted_segments
  add column if not exists coordinate_accuracy text not null default 'exact'
    check (coordinate_accuracy in ('exact', 'municipality'));
