# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要なルール

- `.env.local` およびその他の `.env*` ファイルは **絶対に読み取らない・表示しない**
- 秘密鍵・APIキーを含む可能性のあるファイル（`*.key`, `secrets.*` 等）も同様

## Project Overview

BikeRoute is a web app that generates Google Maps links with vehicle-class-appropriate route settings for motorcycle riders in Japan. It addresses the gap that Google Maps doesn't consider motorcycle-specific road restrictions (e.g., mopeds cannot use expressways).

## Development Commands

```bash
npm install           # 依存関係インストール
npm run dev           # 開発サーバー起動 (http://localhost:3000)
npm run build         # 本番ビルド
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit

# Supabase local
npx supabase start
npx supabase db reset   # migrations/ を再適用
npx supabase stop
```

## Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS, deployed on Vercel
- **Backend**: Supabase — Postgres + PostGIS (spatial queries), Auth (social login), Storage (photos)
- **Maps**: Google Maps URLs (Phase 0) → Embed API (Phase 1) → Routes API (Phase 2)

### Vehicle Classes (Internal)
```ts
type VehicleClass = 'genki1' | 'genki2' | 'normal';
// genki1 = 原付一種 (≤50cc + new standard mopeds)
// genki2 = 原付二種 (≤125cc)
// normal = 普通二輪以上 (≥126cc)
```

### Avoid Settings per Vehicle Class
| Class | Google Maps avoid params |
|---|---|
| genki1 | highways, tolls, ferries |
| genki2 | highways, tolls |
| normal | (none) |

### Data Model — Key Table: `restricted_segments`
Stores road segments where specific vehicle classes are prohibited. Sources:
- `jmpsa` — Japan Motorcycle Promotion & Safety Association (nationwide ~500 locations)
- `mlit` — National Land Information (expressway identification)
- `osm` — OpenStreetMap (`motorroad=yes`)
- `user` — User-submitted with photo evidence + approval voting

Approval flow: `pending` → (3+ confirm votes) → `verified` | (dispute > confirm) → `rejected`

JMPSA and MLIT auto-imported data starts as `verified`.

### Phase Roadmap
- **Phase 0** ✅: Link generation UI — input origin/destination/vehicle class → open Google Maps with correct avoid params
- **Phase 1** ✅: Restricted segment DB (Supabase/PostGIS) + list view with vehicle filter + submission form + verify API
- **Phase 2** ✅: Routes API route calculation + polyline decode + PostGIS RPC spatial intersection + warning UI + rate limiting

### Phase 2 Routing Logic
1. User inputs origin, destination, vehicle class
2. Call Google Routes API with class-appropriate avoid params
3. Decode response polyline to LineString
4. PostGIS query: `ST_Intersects(geometry, decoded_polyline)` against verified restricted_segments
5. If intersections found: warn user, suggest detour (add waypoints or change avoid params)
6. Final route opens in Google Maps

### Security Notes
- Google API keys are server-side only (never exposed to client)
- Photo EXIF data stripped client-side before upload (location privacy)
- Routes API rate-limited per user (10 req/min)

## Progress Tracking

作業の開始・完了・方針変更があるたびに `.PROGRESS.md` を更新すること。

- タスクを開始したら「現在の作業」セクションに追加
- タスクが完了したら「完了済みタスク」に移動し、「現在の作業」から削除
- 判断待ち・保留事項が生じたら「判断待ち・保留事項」テーブルに追記
- ファイル冒頭の「最終更新」日付を必ず更新する

## Key Decisions (from CONCEPT.md)
- Web app only (no native app) — use case is pre-trip planning, not real-time navigation
- "Select vehicle class → automatic settings" UX — avoid params are internal, not shown to users
- Segment-based posting (start point + end point + road name), not point-based
- OSS from the start, community-driven data contribution
