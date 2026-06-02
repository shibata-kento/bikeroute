-- セグメント一覧を座標付きで返す関数
-- /api/segments から呼び出し、地図表示に使用する
CREATE OR REPLACE FUNCTION list_restricted_segments(
  p_vehicle text DEFAULT NULL,
  p_status  text DEFAULT 'verified',
  p_limit   int  DEFAULT 500
)
RETURNS TABLE (
  id                 uuid,
  source             text,
  applies_to         vehicle_class[],
  road_name          text,
  prefecture         text,
  description        text,
  status             text,
  verification_count int,
  created_at         timestamptz,
  start_lat          double precision,
  start_lng          double precision,
  end_lat            double precision,
  end_lng            double precision
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
    SELECT
      rs.id,
      rs.source::text,
      rs.applies_to,
      rs.road_name,
      rs.prefecture,
      rs.description,
      rs.status::text,
      rs.verification_count,
      rs.created_at,
      ST_Y(rs.start_point::geometry)::double precision AS start_lat,
      ST_X(rs.start_point::geometry)::double precision AS start_lng,
      ST_Y(rs.end_point::geometry)::double precision   AS end_lat,
      ST_X(rs.end_point::geometry)::double precision   AS end_lng
    FROM restricted_segments rs
    WHERE rs.status::text = p_status
      AND (p_vehicle IS NULL OR rs.applies_to @> ARRAY[p_vehicle::vehicle_class])
    ORDER BY rs.created_at DESC
    LIMIT p_limit;
END;
$$;

-- anon / authenticated どちらでも呼べるようにする（RLSと同等の公開範囲）
GRANT EXECUTE ON FUNCTION list_restricted_segments TO anon, authenticated;
