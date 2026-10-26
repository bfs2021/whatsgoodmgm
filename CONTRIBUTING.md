# Contributing to WhatsGoodMGM

Thanks for helping. This guide covers how we work; the [README](README.md) covers what the project is and how to run it.

> **The one rule:** never push or merge to `main` yourself. All changes go through a pull request reviewed by **Mishal (@thebadcoder96)** or **Mazin (@therealmazin)**, and only they merge. `main` deploys straight to production.

## Picking something to work on

Work is tracked in GitHub issues. Labels:

| Label | Meaning |
|---|---|
| `good first issue` | Small and well-scoped. Start here. |
| `enhancement` | New feature or improvement |
| `ui` | Visual or interaction work |
| `data` | Event/venue data quality, sources, ingest |
| `bug` | Something is broken |

Comment on the issue (or tell a maintainer) before you start so two people don't do the same thing. If an issue is unclear, ask in the issue.

## Workflow

1. **Branch from `main`:** `git switch main && git pull && git switch -c <type>/<short-name>`
   e.g. `fix/flyer-fallback`, `feat/venue-page`, `docs/runbook-zoo`.
2. **Make small, focused commits.** One idea per PR is easier to review than five.
3. **Open a pull request** into `main`, fill in the template, and **request review from @thebadcoder96 or @therealmazin**. GitHub requests it automatically through `.github/CODEOWNERS`.
4. **A maintainer reviews.** Expect questions; respond in the PR and push fixes to the same branch. Never merge your own PR.
5. **Only Mishal or Mazin merge.** Merging deploys to production (Vercel), so every merge is a release.

### Commit messages

Short, lowercase prefix, then what changed. Match the existing history:

```
feat: weekly view on the calendar page
fix: mobile nav dedupe
perf: resize event flyers via next/image
docs: add montgomery symphony to curator pages
chore: drop unused eventbrite fetcher
```

Use a scope when it helps: `fix(geocode-venues): …`. Explain the *why* in the body if it isn't obvious.

## Before you open a PR

All of these must pass locally:

```bash
npm run lint        # 0 errors (warnings are OK but don't add new ones)
npx tsc --noEmit    # typecheck
npm test            # unit tests
npm run build       # production build
```

And:

- **Add or update tests** when you change logic in `ingest/`, `src/lib/events/`, or `src/lib/ics.ts`. Fetchers are tested against fixtures in `ingest/fetchers/__fixtures__/`.
- **Check the UI in a browser** (`npm run dev`) for anything visual, at phone width (~390px) and desktop, in light and dark mode.
- **Keep tests independent of the date.** Use `vi.useFakeTimers()` + `vi.setSystemTime(...)` when a test depends on "now".

## Safety rules

- **Never commit secrets.** `.env.local` is gitignored; keep it that way. Only names go in `.env.example`.
- **`SANITY_WRITE_TOKEN` is maintainer-only.** Without it you can still run the site, tests, and every `--dry-run`. If you need to write data, ask a maintainer to run it.
- **Dry-run first.** Anything that writes to Sanity (`ingest`, `write-extracted`, `geocode-venues`) has a `--dry-run` flag. Run that, read the output, then run for real. `tag-interests` has no dry-run; it writes immediately.
- **Never delete or bulk-overwrite events.** The ingest writer merges duplicates itself.
- **Every event needs a real `sourceUrl`.** No source, no event.
- **Flyers are hotlinks.** Don't add an image host to `next/image` (`src/lib/images.ts`) without checking it serves stable HTTPS URLs, and make sure a broken flyer still leaves the event readable.
- **Be a good citizen to sources.** Keep rate limits (e.g. Nominatim at 1 request/second) and identifying User-Agents in fetchers and scripts.

## Code conventions

- TypeScript everywhere, following the style of the file you're in.
- This is Next.js 16 with the App Router; some APIs differ from older docs (see `AGENTS.md`). Check `node_modules/next/dist/docs/` when unsure.
- Times are stored in UTC and displayed in `America/Chicago`. Use the helpers in `src/lib/events/` and `ingest/lib/normalize.ts` rather than raw `Date` math.
- Prefer small pure functions with tests over logic buried in components.

## Using AI coding tools

Fine and encouraged. `CLAUDE.md`/`AGENTS.md` give agents the project rules. You are still responsible for every line in your PR: read it, run the checks, and be ready to explain it.

---

© MM Intelligence. Internal project, all rights reserved.
