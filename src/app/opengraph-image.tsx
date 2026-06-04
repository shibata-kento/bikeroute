import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BikeRoute — Bike Route Restriction Checker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#111827",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* オレンジトップバー */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#f97316",
          }}
        />

        {/* ロゴ行 */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f97316",
              borderRadius: 16,
              width: 80,
              height: 80,
              marginRight: 24,
              fontSize: 48,
              color: "white",
              fontWeight: 900,
            }}
          >
            B
          </div>
          <span style={{ color: "white", fontSize: 80, fontWeight: 900 }}>
            BikeRoute
          </span>
        </div>

        {/* サブタイトル */}
        <div
          style={{
            display: "flex",
            color: "#fb923c",
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Bike Restriction Checker for Mopeds & Motorcycles
        </div>

        {/* 説明 */}
        <div
          style={{
            display: "flex",
            color: "#9ca3af",
            fontSize: 22,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Check restricted roads before your ride — by vehicle class
        </div>

        {/* バッジ行 */}
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          {["Moped 50cc", "Moped 125cc", "Motorcycle 126cc+"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                background: "#1f2937",
                border: "1px solid #374151",
                borderRadius: 9999,
                padding: "8px 24px",
                color: "#d1d5db",
                fontSize: 20,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* ドメイン */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 36,
            right: 60,
            color: "#4b5563",
            fontSize: 18,
          }}
        >
          bikeroute.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
