import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  // A frame of the site's dark backdrop clip. ImageResponse can't blur what's
  // behind an element, so the frost under the card is baked into this image —
  // the card below must keep the same size to sit exactly on it.
  const background = await readFile(
    join(process.cwd(), "public/og-background.jpg"),
  );
  const backgroundSrc = `data:image/jpeg;base64,${background.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundSrc})`,
        backgroundSize: "1200px 630px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          width: 760,
          height: 440,
          borderRadius: 48,
          background: "rgba(28, 28, 32, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.28)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.45)",
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: ImageResponse renders JSX to a static PNG — next/image does not exist here */}
        <img
          src={logoSrc}
          width={200}
          height={200}
          alt=""
          style={{ borderRadius: 48 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textShadow: "0 2px 24px rgba(0, 0, 0, 0.35)",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.85)",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
