# Changelog

## 1.0.0 — 2026-11-03 (in progress)
- Independent Text Talents web app adapted from Kelly App without modifying Kelly App.
- Excel worksheet/column selection, name/phone CSVs max 180 contacts, review and prompt builder.
- Automatic English/Spanish header aliases, responsive standalone design and creator credit.
- Seven core/workbook regressions PASS; strict TypeScript and production build PASS. Browser: auto-detection on bilingual headers, custom manual mapping, review reset, two actual CSV downloads (180 + 1) independently parsed, prompt clipboard copy. Physical mobile/Sense import not tested.
- Sender branding is editable, with no hardcoded Kelly company in the prompt.
- Deployment pending.

## Publication follow-up — 2026-11-03
Implementation commit 137a70c4a7f3a697e9df9b2188651ef13ceee1bf published on public main. Seven local tests/strict TS/build PASS; browser automatic and manual mapping, 180+1 actual CSVs, clipboard and final creator credit verified. Kelly App files unchanged by this task. Vercel MCP returned create-project 403; existing GitHub sign-in opened the normal import flow in Rodrigo Bermudez’s projects, but Deploy requires email reauthentication. Verification requested through normal Vercel UI; owner must complete it before deployment can proceed. No production app URL claimed. Source CI configured; remote CI status not yet verified.

## 2026-11-03 — Usage guide plan
Add an initially expanded, collapsible English quick-start guide directly under the page introduction, explaining Excel upload, worksheet/header/manual columns, review/skipped rows, downloads max180, prompt copy and final Sense import/review. Preserve controls, local processing and creator credit. Acceptance: seven regression tests, TS/build, browser guide visibility/collapse and existing workbook controls; verify production assets after Git deployment.

- Scope update requested by user: Area or schools and Sender or team start empty. Prompt uses explicit placeholders when missing instead of inserting a team. Include this change with the usage guide; validate defaults in browser and prompt fallback in existing regression.

- Local validation: seven regressions PASS, strict TypeScript/build PASS. Browser shows six-step guide expanded; collapsing it preserves form controls. Area and Sender empty; prompt placeholders verified. Production original app observed deployed by owner; guide/default update pending publication.

- Final user steering: top eyebrow now OUTREACH STUDIO only; creator/company credit remains in footer. Previous guide/defaults commit 036ce51f9946771fa3f02334ad29c9c85bfe7eaa published; final header revision pending verification/deploy.
