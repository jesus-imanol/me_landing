/* eslint-disable @next/next/no-img-element -- ImageResponse (satori) solo acepta <img> */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Jesús Imanol, desarrollador Full Stack: ilustración saludando frente a su nombre en letras gigantes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asset = (file: string) => readFile(join(process.cwd(), "assets", file));
const dataUri = async (file: string) => `data:image/png;base64,${(await asset(file)).toString("base64")}`;

export default async function OpengraphImage() {
  const [anton, frente, bug, coin] = await Promise.all([
    asset("AntonSC-Regular.ttf"),
    dataUri("og-frente.png"),
    dataUri("og-bug.png"),
    dataUri("og-coin.png"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f5f3ff", position: "relative", fontFamily: "Anton SC" }}>
        <div style={{ position: "absolute", left: 56, top: 48, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 190, lineHeight: 0.84, color: "#16132b" }}>JESÚS</div>
          <div style={{ fontSize: 190, lineHeight: 0.84, color: "#5b47f0" }}>IMANOL</div>
          <div style={{ display: "flex", marginTop: 34 }}>
            <div
              style={{
                display: "flex",
                fontSize: 40,
                color: "#16132b",
                background: "#d7f23a",
                border: "4px solid #16132b",
                boxShadow: "8px 8px 0 #16132b",
                padding: "10px 22px",
              }}
            >
              FULL STACK DEVELOPER · CHIAPAS, MX
            </div>
          </div>
          <div style={{ fontSize: 25, color: "#67638a", marginTop: 30, letterSpacing: 1 }}>
            GO · NODE.JS · SUPABASE · REACT · NEXT.JS · VUE · FLUTTER
          </div>
        </div>
        <img src={frente} width={470} style={{ position: "absolute", right: 30, bottom: -10 }} alt="" />
        <img src={coin} width={110} style={{ position: "absolute", right: 470, top: 40, transform: "rotate(-12deg)" }} alt="" />
        <img src={bug} width={120} style={{ position: "absolute", right: 40, top: 30, transform: "rotate(10deg)" }} alt="" />
      </div>
    ),
    { ...size, fonts: [{ name: "Anton SC", data: anton, style: "normal", weight: 400 }] },
  );
}
