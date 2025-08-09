# Name Badge Admin Scripts

Participant name badge data management tool for Vue Fes Japan 2025

## Setup

### 1. Environment Variables (`.env`)
```env
CLOUDFLARE_ACCOUNT_ID=xxx
CLOUDFLARE_R2_ACCESS_KEY_ID=xxx
CLOUDFLARE_R2_SECRET_ACCESS=xxx
CLOUDFLARE_R2_BUCKET_NAME=xxx
```

### 2. Create Data File (`input/data.ts`)

Since `/input/img` is gitignored, to place image files.

```typescript
import path from "node:path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

import type { NameBadgeInput } from "./type";

const data: NameBadgeInput[] = [
  // Create new
  {
    name: "Taro Yamada",
    role: "Attendee",  // Attendee | Attendee+Party | Speaker | Sponsor | Staff
    localAvatarImagePath: path.resolve(__dirname, "./images/yamada.jpg")
  },
  
  // Staff (language specification required)
  {
    name: "Hanako Suzuki",
    role: "Staff",
    lang: "jp",  // jp | en
    localAvatarImagePath: path.resolve(__dirname, "./images/suzuki.png")
  },
  
  // Update
  {
    name: "Jiro Tanaka",
    role: "Speaker",
    action: "update",
    localAvatarImagePath: path.resolve(__dirname, "./images/tanaka_new.jpg")  // Optional
  },
  
  // Delete
  {
    name: "Saburo Sato",
    role: "Sponsor",
    action: "delete"
  }
];

export default data;
```

## Execution

```bash
pnpm dlx tsx scripts/admin/name-badge/main.ts
```

## Notes

- **Image formats**: `.png`, `.jpg`, `.jpeg` only
- **Unique**: Combination of name + role must be unique
- **Images are automatically uploaded to Cloudflare R2**

