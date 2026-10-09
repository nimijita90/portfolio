// Renders showreel/index.html to MP4: node showreel/render.mjs [scale=0.5] [fps=25] [out=showreel/out/draft.mp4] [from] [to]
const { chromium } = await import(process.env.PLAYWRIGHT ?? "playwright");
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const [scale = "0.5", fps = "25", out = "showreel/out/draft.mp4", from, to] = process.argv.slice(2);
const dir = path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: Number(scale) });
await page.goto(pathToFileURL(path.join(dir, "index.html")).href + "?render");
await page.evaluate(() => window.ready);
const duration = await page.evaluate(() => window.DURATION);
const start = Number(from ?? 0), end = Number(to ?? duration);
const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", fps, "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", scale < 1 ? "23" : "16", "-preset", "medium", path.resolve(out)], { stdio: ["pipe", "inherit", "inherit"] });
const frames = Math.round((end - start) * Number(fps));
for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.seek(t), start + i / Number(fps));
  ff.stdin.write(await page.screenshot({ type: "jpeg", quality: 92 }));
  if (i % 100 === 0) console.log(`frame ${i}/${frames}`);
}
ff.stdin.end();
await new Promise((r) => ff.on("close", r));
await browser.close();
console.log("wrote", out);
