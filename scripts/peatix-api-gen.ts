import path from "node:path";
import fs from "node:fs";
import cp from "node:child_process";

import dotenv from "dotenv";
import fetch from "node-fetch";

// npx openapi-typescript $OPEN_API_PATH -o path.resolve("server/peatix-api/schema.d.ts")

dotenv.config();

const OPEN_API_PATH = path.resolve("server/peatix-api/openapi.json");

// download OpenAPI schema from Peatix API
const schema = await fetch(`${process.env.PEATIX_API_ORIGIN}/openapi.json`, {}).then(response => response.json());

fs.writeFileSync(OPEN_API_PATH, JSON.stringify(schema, null, 2) + "\n");

// generate TypeScript types from OpenAPI schema
const outputPath = path.resolve("server/peatix-api/schema.d.ts");
cp.execSync(`npx openapi-typescript ${OPEN_API_PATH} -o ${outputPath}`, {
  stdio: "inherit",
});
