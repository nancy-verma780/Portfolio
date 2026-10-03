import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, developer portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#0d0e14",
          color: "#ece9f1",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 720,
            height: 720,
            borderRadius: 9999,
            background: "radial-gradient(circle at 40% 40%, rgba(157,140,255,.55), rgba(238,141,185,.35) 45%, rgba(244,194,140,0) 70%)",
          }}
        />
        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#9b9aae", maxWidth: 900, lineHeight: 1.3 }}>
          {profile.identity}
        </div>
        <div
          style={{
            marginTop: 48,
            height: 6,
            width: 240,
            borderRadius: 6,
            background: "linear-gradient(90deg,#9d8cff,#ee8db9 55%,#f4c28c)",
          }}
        />
      </div>
    ),
    size,
  );
}
