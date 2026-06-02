-- restriction_tag: OSMタグやデータ種別を記録
-- 値の例: 'motorway', 'motorroad', 'motorcycle_no', 'moped_no'
-- 既存レコードは NULL（OSMデータ再インポート時に設定される）
ALTER TABLE restricted_segments
  ADD COLUMN IF NOT EXISTS restriction_tag text;

CREATE INDEX IF NOT EXISTS idx_restricted_segments_restriction_tag
  ON restricted_segments(restriction_tag);
