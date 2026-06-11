import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          border: "3px solid #f97316",
          color: "white",
          fontSize: 20,
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: "-1px",
        }}
      >
        BR
      </div>
    ),
    { width: 48, height: 48 }
  );
}
