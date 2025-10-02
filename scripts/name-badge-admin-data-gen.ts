import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const code = `import { fileURLToPath } from "node:url";
import path from "node:path";
import type { NameBadgeInput } from "./type";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const data: NameBadgeInput[] = [
  // {
  //   name: "",
  //   role: "",
  //   localAvatarImagePath: path.resolve(__dirname, ""),
  // },
];

export default data;
`;

if (!existsSync(path.resolve(__dirname, "./admin/name-badge/input/data.ts"))) {
  await writeFile(path.resolve(__dirname, "./admin/name-badge/input/data.ts"), code, "utf-8");
}
