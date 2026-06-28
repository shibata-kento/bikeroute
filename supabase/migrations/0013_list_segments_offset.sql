-- list_restricted_segments に p_offset を追加
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT oid::regprocedure::text AS sig FROM pg_proc WHERE proname = 'list_restricted_segments'
  LOOP
    EXECUTE 'DROP FUNCTION IF EXISTS ' || r.sig;
  END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION list_restricted_segments(
  p_vehicle            text            DEFAULT NULL,
  p_status             text            DEFAULT 'verified',
  p_limit              int             DEFAULT 500,
  p_offset             int             DEFAULT 0,
  p_sources            text[]          DEFAULT NULL,
  p_prefecture         text            DEFAULT NULL,
  p_applies_to_exact   vehicle_class[] DEFAULT NULL,
  p_restriction_tags   text[]          DEFAULT NULL
)
RETURNS TABLE (
  id                  uuid,
  source              text,
  applies_to          vehicle_class[],
  road_name           text,
  prefecture          text,
  description         text,
  status              text,
  verification_count  int,
  created_at          timestamptz,
  coordinate_accuracy text,
  street_view_url     text,
  start_lat           double precision,
  start_lng           double precision,
  end_lat             double precision,
  end_lng             double precision
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
      rs.coordinate_accuracy,
      rs.street_view_url,
      ST_Y(rs.start_point::geometry)::double precision AS start_lat,
      ST_X(rs.start_point::geometry)::double precision AS start_lng,
      ST_Y(rs.end_point::geometry)::double precision   AS end_lat,
      ST_X(rs.end_point::geometry)::double precision   AS end_lng
    FROM restricted_segments rs
    WHERE rs.status::text = p_status
      AND (p_vehicle           IS NULL OR rs.applies_to @> ARRAY[p_vehicle::vehicle_class])
      AND (p_sources           IS NULL OR rs.source::text = ANY(p_sources))
      AND (p_prefecture        IS NULL OR rs.prefecture = p_prefecture)
      AND (p_applies_to_exact  IS NULL OR rs.applies_to = p_applies_to_exact)
      AND (p_restriction_tags  IS NULL
           OR rs.source::text != 'osm'
           OR rs.restriction_tag = ANY(p_restriction_tags))
    ORDER BY rs.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$;

GRANT EXECUTE ON FUNCTION list_restricted_segments TO anon, authenticated;
