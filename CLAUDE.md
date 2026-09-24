# TV Dance Website working rules

- This directory is an independent public marketing website.
- Do not import from, write to, or couple this project with `../crm-app/`.
- The only CRM integration is an external link to `https://crm.tvdance.online/`.
- Do not add login, student portal, dashboard, database, payment, attendance, or CRM features.
- Keep navigation labels: Trang chủ, Lớp học, Phong cách, Giải Đấu, Tin tức, CRM.
- Preserve the dark editorial dance direction documented in `DESIGN.md`.
- Before modifying this project, read `WEBTVDANCE-MEMORY.md` together with `DESIGN.md`.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before handoff.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
