-- check_route_restrictions を更新
-- - coordinate_accuracy を返却カラムに追加
-- - exact: ST_Intersects による正確な交差判定
-- - municipality: ST_DWithin 10km バッファによる概算判定
drop function if exists check_route_restrictions(text, vehicle_class);

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
  coordinate_accuracy text,
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
  route_geom := ST_GeogFromText(route_wkt);

  return query
    -- 精確なセグメント: ルートとの幾何学的交差
    select
      rs.id,
      rs.road_name,
      rs.prefecture,
      rs.description,
      rs.applies_to,
      rs.source,
      rs.coordinate_accuracy,
      ST_Y(rs.start_point::geometry)::double precision as start_lat,
      ST_X(rs.start_point::geometry)::double precision as start_lng,
      ST_Y(rs.end_point::geometry)::double precision   as end_lat,
      ST_X(rs.end_point::geometry)::double precision   as end_lng
    from restricted_segments rs
    where rs.status = 'verified'
      and rs.applies_to @> ARRAY[vehicle]::vehicle_class[]
      and rs.coordinate_accuracy = 'exact'
      and rs.geometry is not null
      and ST_Intersects(rs.geometry, route_geom)

    union all

    -- 概算セグメント: ルートから 10km 以内（市区町村レベル精度）
    select
      rs.id,
      rs.road_name,
      rs.prefecture,
      rs.description,
      rs.applies_to,
      rs.source,
      rs.coordinate_accuracy,
      ST_Y(rs.start_point::geometry)::double precision as start_lat,
      ST_X(rs.start_point::geometry)::double precision as start_lng,
      ST_Y(rs.end_point::geometry)::double precision   as end_lat,
      ST_X(rs.end_point::geometry)::double precision   as end_lng
    from restricted_segments rs
    where rs.status = 'verified'
      and rs.applies_to @> ARRAY[vehicle]::vehicle_class[]
      and rs.coordinate_accuracy = 'municipality'
      and ST_DWithin(rs.start_point, route_geom, 10000);
end;
$$;
