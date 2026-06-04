import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "BikeRoute — バイク車種別 通行禁止区間チェック";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/notosansjp/v53/-F6jfjtqLzI2JPCgQBnQYggHqhH_iFqp.woff2"
  )
    .then((r) => r.arrayBuffer())
    .catch(() => null);

  const fonts = fontData
    ? [{ name: "NotoJP", data: fontData, weight: 700 as const }]
    : [];

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
          padding: "60px",
          fontFamily: fontData ? "NotoJP" : "sans-serif",
          position: "relative",
        }}
      >
        {/* オレンジのトップバー */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "10px",
            background: "#f97316",
            display: "flex",
          }}
        />

        {/* タイトル */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              background: "#f97316",
              borderRadius: "16px",
              width: "72px",
              height: "72px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
              fontSize: "40px",
            }}
          >
            B
          </div>
          <span
            style={{ color: "white", fontSize: "72px", fontWeight: 900, letterSpacing: "-1px" }}
          >
            BikeRoute
          </span>
        </div>

        {/* キャッチコピー */}
        <div
          style={{
            color: "#fb923c",
            fontSize: "32px",
            fontWeight: 700,
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          バイク車種別 通行禁止区間チェック
        </div>

        {/* 説明 */}
        <div
          style={{
            color: "#9ca3af",
            fontSize: "22px",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.6,
          }}
        >
          原付・125cc・二輪の通行禁止区間を事前に確認
        </div>

        {/* 3 バッジ */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {["原付一種", "原付二種", "普通二輪以上"].map((label) => (
            <div
              key={label}
              style={{
                background: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "9999px",
                padding: "8px 20px",
                color: "#d1d5db",
                fontSize: "18px",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* ドメイン */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            right: "60px",
            color: "#4b5563",
            fontSize: "16px",
            display: "flex",
          }}
        >
          bikeroute.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
