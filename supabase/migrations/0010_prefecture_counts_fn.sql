-- 都道府県別の通行禁止区間件数を返す集計関数
CREATE OR REPLACE FUNCTION get_prefecture_segment_counts()
RETURNS TABLE (prefecture text, cnt bigint)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT prefecture, COUNT(*)::bigint AS cnt
  FROM restricted_segments
  WHERE status = 'verified' AND prefecture IS NOT NULL
  GROUP BY prefecture
  ORDER BY cnt DESC;
$$;

GRANT EXECUTE ON FUNCTION get_prefecture_segment_counts TO anon, authenticated;

-- 都道府県別の正確な件数を返す関数（個別ページ用）
CREATE OR REPLACE FUNCTION get_prefecture_segment_count(p_prefecture text)
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::bigint
  FROM restricted_segments
  WHERE status = 'verified' AND prefecture = p_prefecture;
$$;

GRANT EXECUTE ON FUNCTION get_prefecture_segment_count TO anon, authenticated;
