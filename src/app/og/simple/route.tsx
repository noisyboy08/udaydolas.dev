import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title");

  const robotoCondensedMedium = await readFile(
    join(process.cwd(), "src/assets/fonts/RobotoCondensed-Medium.ttf")
  );

  return new ImageResponse(
    (
      <div tw="w-full h-full flex items-center justify-center text-white bg-black p-16">
        <div tw="absolute flex inset-y-0 w-px border border-zinc-800 left-16" />
        <div tw="absolute flex inset-y-0 w-px border border-zinc-800 right-16" />
        <div tw="absolute flex inset-x-0 h-px border border-zinc-800 top-16" />
        <div tw="absolute flex inset-x-0 h-px border border-zinc-800 bottom-16" />

        {/* UD monogram — bottom-right branding */}
        <div tw="absolute flex items-center bottom-16 right-16">
          <span
            style={{
              fontFamily: "RobotoCondensed",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            UD
          </span>
          <span
            style={{
              fontFamily: "RobotoCondensed",
              fontSize: 14,
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.35)",
              marginLeft: 10,
              textTransform: "uppercase",
            }}
          >
            udaydolas.dev
          </span>
        </div>

        <h1
          tw="text-center font-medium"
          style={{
            fontFamily: "RobotoCondensed",
            fontSize: 64,
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "RobotoCondensed",
          data: robotoCondensedMedium,
          weight: 500,
        },
      ],
    }
  );
}
