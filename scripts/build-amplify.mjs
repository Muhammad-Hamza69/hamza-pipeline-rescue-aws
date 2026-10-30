import { mkdir, writeFile, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import nextEnv from "@next/env";

// A static host entry around the existing portfolio. Normal Next.js hosting
// retains the CMS Studio and revalidation endpoint; Amplify serves a snapshot.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const staging = path.join(root, ".amplify-build");
if (path.dirname(staging) !== root || path.basename(staging) !== ".amplify-build") {
  throw new Error("Unexpected static build directory.");
}
nextEnv.loadEnvConfig(root);
// Keep Next's compilation cache; only the generated export is replaced.
await rm(path.join(staging, "out"), { recursive: true, force: true });
await mkdir(path.join(staging, "app"), { recursive: true });
await cp(path.join(root, "public"), path.join(staging, "public"), { recursive: true });
await cp(path.join(root, "app/icon.svg"), path.join(staging, "app/icon.svg"));
await writeFile(path.join(staging, "app/page.tsx"), 'export const dynamic = "force-static";\nexport { default } from "../../app/page";\n');
await writeFile(path.join(staging, "app/layout.tsx"), 'export { default, metadata } from "../../app/layout";\n');
await writeFile(path.join(staging, "next.config.ts"), 'import base from "../next.config";\nexport default { ...base, output: "export", images: { ...base.images, unoptimized: true } };\n');
await writeFile(path.join(staging, "tsconfig.json"), JSON.stringify({ extends: "../tsconfig.json", compilerOptions: { baseUrl: ".." }, include: ["next-env.d.ts", "app/**/*.tsx", ".next/types/**/*.ts"], exclude: ["node_modules"] }, null, 2));
await cp(path.join(root, "postcss.config.mjs"), path.join(staging, "postcss.config.mjs"));
await writeFile(path.join(staging, "package.json"), JSON.stringify({ name: "hamza-portfolio-amplify", private: true }));
const built = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], { cwd: staging, stdio: "inherit", env: process.env });
if (built.status !== 0) process.exit(built.status ?? 1);
console.log("Amplify static artifact: .amplify-build/out (HTML, CSS, JS and public assets only).");
