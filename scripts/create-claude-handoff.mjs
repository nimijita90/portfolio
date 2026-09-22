import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outputRoot = process.argv[2];

if (!outputRoot || !path.isAbsolute(outputRoot)) {
  throw new Error("Pass a new absolute output directory.");
}

try {
  await stat(outputRoot);
  throw new Error(`Output already exists: ${outputRoot}`);
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const projectDir = path.join(outputRoot, "maria-mora-portfolio");
const contextDir = path.join(outputRoot, "claude-context");
await mkdir(projectDir, { recursive: true });
await mkdir(contextDir, { recursive: true });

const directories = ["app", "build", "docs", "public", "scripts", "tests", "worker"];
const files = [
  ".env.example",
  ".gitignore",
  "CLAUDE.md",
  "CONTENT.md",
  "DESIGN.md",
  "README.md",
  "eslint.config.mjs",
  "next.config.ts",
  "package.json",
  "pnpm-lock.yaml",
  "tsconfig.json",
  "vite.config.ts",
];

for (const entry of [...directories, ...files]) {
  await cp(path.join(root, entry), path.join(projectDir, entry), { recursive: true });
}

await mkdir(path.join(projectDir, ".openai"), { recursive: true });
await writeFile(
  path.join(projectDir, ".openai", "hosting.json"),
  `${JSON.stringify({ project_id: null, d1: null, r2: null }, null, 2)}\n`,
);

let handoffCommit = "unavailable";
try {
  handoffCommit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
} catch {
  // A handoff extracted without .git remains valid.
}

const version = {
  handoff_name: "Maria Mora portfolio — Claude handoff",
  generated_at: new Date().toISOString(),
  frozen_production_version: 34,
  frozen_production_url: "https://maria-lopez-design-portfolio.malapipa.chatgpt.site",
  frozen_product_snapshot_commit: "914dce0fc692425788b9afc9708e32d158904dde",
  handoff_preparation_commit: handoffCommit,
  package_role: "Independent clone. Not authorised to modify or deploy the frozen production Site.",
  excluded: [
    ".git and repository credentials",
    "node_modules and package-manager stores",
    "dist, .next, .vinext and other generated build output",
    ".wrangler state and local environment files",
    "Codex-only .agents skills and skills-lock.json",
    "local recovery archives and OS metadata",
  ],
};

await writeFile(path.join(projectDir, "HANDOFF-VERSION.json"), `${JSON.stringify(version, null, 2)}\n`);

const contextEntries = [
  "CLAUDE.md",
  "README.md",
  "docs/handoff",
  "docs/case-studies/wand.md",
  "docs/reference/canva-assets.md",
];

for (const entry of contextEntries) {
  await cp(path.join(projectDir, entry), path.join(contextDir, entry), { recursive: true });
}
await cp(path.join(projectDir, "HANDOFF-VERSION.json"), path.join(contextDir, "HANDOFF-VERSION.json"));

async function listFiles(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await listFiles(absolute, base));
    else if (entry.name !== "CHECKSUMS.sha256") paths.push(path.relative(base, absolute));
  }
  return paths;
}

async function writeChecksums(directory) {
  const paths = await listFiles(directory);
  const lines = [];
  for (const relative of paths) {
    const data = await readFile(path.join(directory, relative));
    const digest = createHash("sha256").update(data).digest("hex");
    lines.push(`${digest}  ${relative.split(path.sep).join("/")}`);
  }
  await writeFile(path.join(directory, "CHECKSUMS.sha256"), `${lines.join("\n")}\n`);
  return paths.length;
}

const projectFiles = await writeChecksums(projectDir);
const contextFiles = await writeChecksums(contextDir);

console.log(JSON.stringify({ outputRoot, projectDir, contextDir, projectFiles, contextFiles }, null, 2));
