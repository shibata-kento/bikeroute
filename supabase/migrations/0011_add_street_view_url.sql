-- street_view_url カラムを追加
ALTER TABLE restricted_segments ADD COLUMN IF NOT EXISTS street_view_url text;

-- Street View 画像を保存する public バケット
INSERT INTO storage.buckets (id, name, public)
VALUES ('segment-images', 'segment-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read segment-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'segment-images');

-- スクリプトからの書き込みは service role で行うため INSERT ポリシーは不要
