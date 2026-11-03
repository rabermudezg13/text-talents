# Text Talents

Created by Rodrigo Bermudez · Cafe Cultura LLC · with Love ♥

Standalone browser app for preparing outreach lists from Excel and building an SMS prompt to paste into your preferred AI. No installation is required for users.

## Features
- Open .xlsx/.xls workbooks (under 20 MB) and select a worksheet.
- Detect common English/Spanish name and phone headers, or choose columns/header row manually.
- Normalize US phone numbers, optionally deduplicate and include country code 1.
- Review accepted contacts and skipped rows before downloading.
- Export **Name,Phone** CSVs containing at most **180 contacts** plus a header per file.
- Customize work date, area, sender, language, tone, verified details and CTA; copy the prompt.

Files and contacts are processed only in this browser tab, with no uploads, contact storage, analytics, SMS sending or AI API calls. Refreshing or closing the tab clears the working list. Downloads are saved to your own computer. The public source repository contains no customer spreadsheets.

The CSV fields must be mapped to your account's Sense template. Numbers are not checked for deliverability or SMS availability. The 180-contact cap is the requested workflow limit.

## Development
Node 22.6+ (Node 24 recommended).

```sh
npm ci
npm test
npm run build
npm run dev
```

Deploy as a Vite app on Vercel: build `npm run build`, output `dist`. No environment variables or backend required.

## Provenance
Adapted from the owner-authorized Text Talents module in rabermudezg13/kelly-app-v2. This is an independent codebase and deployment; it does not change Kelly App.

Read AGENTS.md and memory.md before maintenance. Track changes in CHANGELOG.md.

## Publication status (2026-11-03)
Live app: https://text-talents.vercel.app/  
Public source: https://github.com/rabermudezg13/text-talents

Usage guide and blank area/sender defaults: 036ce51f9946771fa3f02334ad29c9c85bfe7eaa. Simplified Outreach Studio header: 7e096ef29d486cb549aaf67763f8fb8d3a0c4eca. CI succeeded and the production browser/assets were verified for this revision. Creator credit remains in the footer.
