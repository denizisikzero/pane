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

const dataUrl = (bytes: Buffer, type: string) =>
  `data:${type};base64,${bytes.toString("base64")}`;

/**
 * The card links get: the wordmark in Instrument Serif with the
 * header's glass gradient, the tagline — and a render beside them, as on the
 * site.
 */
export default async function Image() {
  // literal paths, so the build traces just these two files
  const [serif, render] = await Promise.all([
    readFile(join(process.cwd(), "lib/fonts/instrument-serif-italic.ttf")),
    readFile(join(process.cwd(), "public/previews/chrome.jpg")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 56,
        padding: 56,
        background: "#f5f5f7",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
          paddingLeft: 24,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
            fontSize: 196,
            lineHeight: 1,
            letterSpacing: "-0.015em",
            paddingRight: 16,
            // the header's glass-text gradient
            backgroundImage:
              "linear-gradient(115deg, #7e7e80 0%, #1d1d1f 35%, #c9c9cc 50%, #1d1d1f 65%, #7e7e80 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            lineHeight: 1.25,
            color: "#1d1d1f",
            maxWidth: 520,
          }}
        >
          {siteConfig.tagline}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#6e6e73" }}>
          pane.theui.company
        </div>
      </div>
      {/* biome-ignore lint/performance/noImgElement: ImageResponse renders JSX to a static PNG — next/image does not exist here */}
      <img
        src={dataUrl(render, "image/jpeg")}
        width={460}
        height={518}
        alt=""
        style={{ borderRadius: 44, objectFit: "cover" }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: serif,
          style: "italic",
          weight: 400,
        },
      ],
    },
  );
}
