# Text Talents memory

## 2026-11-03 — Plan before implementation
Independent browser-only app adapted from the Text Talents module in Kelly App. Public repository text-talents requested by owner. Preserve 180-contact CSV maximum, Name/Phone only, manual mapping and worksheet selection, contact review and independent prompt builder. Expand header aliases including Phone Number and Spanish. Add requested creator credit. No customer data, backend, login or AI calls. Kelly App source remains unchanged.

Acceptance: core tests, strict TypeScript/build, browser synthetic Excel import/manual mapping/CSV download/prompt copy/clear, responsive check, then GitHub source and Vercel production verified.

## Local validation
Seven tests, strict TypeScript and build PASS. Synthetic workbook 181 contacts yields actual downloads of 180 + 1, independently read as Name/Phone only. Browser automatic bilingual header detection, custom sheet/manual columns, review invalidation and prompt copy succeed. Physical mobile and Sense imports not tested. Public repository created at https://github.com/rabermudezg13/text-talents, initial SHA 79226b0bcb50e3b7f7078a5b5048058c05f6b7b8. Standalone source publication/Vercel pending.

## Publication follow-up — 2026-11-03
Implementation commit 137a70c4a7f3a697e9df9b2188651ef13ceee1bf published on public main. Seven local tests/strict TS/build PASS; browser automatic and manual mapping, 180+1 actual CSVs, clipboard and final creator credit verified. Kelly App files unchanged by this task. Vercel MCP returned create-project 403; existing GitHub sign-in opened the normal import flow in Rodrigo Bermudez’s projects, but Deploy requires email reauthentication. Verification requested through normal Vercel UI; owner must complete it before deployment can proceed. No production app URL claimed. Source CI configured; remote CI status not yet verified.

## 2026-11-03 — Usage guide plan
Add an initially expanded, collapsible English quick-start guide directly under the page introduction, explaining Excel upload, worksheet/header/manual columns, review/skipped rows, downloads max180, prompt copy and final Sense import/review. Preserve controls, local processing and creator credit. Acceptance: seven regression tests, TS/build, browser guide visibility/collapse and existing workbook controls; verify production assets after Git deployment.

- Scope update requested by user: Area or schools and Sender or team start empty. Prompt uses explicit placeholders when missing instead of inserting a team. Include this change with the usage guide; validate defaults in browser and prompt fallback in existing regression.

- Local validation: seven regressions PASS, strict TypeScript/build PASS. Browser shows six-step guide expanded; collapsing it preserves form controls. Area and Sender empty; prompt placeholders verified. Production original app observed deployed by owner; guide/default update pending publication.
