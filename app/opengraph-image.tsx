import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jenny Hillert — Equestrian";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a3a2a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            backgroundColor: "#2a5a3a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#f5f2ed",
              letterSpacing: "-2px",
            }}
          >
            JH
          </span>
        </div>
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f5f2ed",
            marginBottom: 16,
          }}
        >
          Jenny Hillert
        </span>
        <span
          style={{
            fontSize: 28,
            color: "#b8c5b0",
            letterSpacing: "4px",
          }}
        >
          Hunter · Equitation · IEA
        </span>
      </div>
    ),
    { ...size }
  );
}
