# API client generation

The RTK Query API clients (`*.gen.ts`) are generated **per slice** from one
schema snapshot per slice:

```
slices.ts  →  schema/<slice>.json  →  @rtk-query/codegen-openapi  →  <slice>-api-slice.gen.ts
```

- `slices.ts` is the single source of truth: one entry per slice with its name,
  its generated output file and the path pattern that assigns endpoints to it.
  Codegen (`openapi-config.ts`) and the sync tool (`sync/api-sync.ts`) both
  derive from it.
- `schema/<slice>.json` is a self-contained OpenAPI snapshot: only the slice's
  paths plus every component they transitively reference. Shared schemas such
  as `Error` are deliberately copied into every snapshot, so a change to one
  slice never touches another slice's files. Snapshots are pretty-printed with
  a canonical key order (the order of `paths`, `properties` and `responses` is
  kept — codegen output depends on it) and carry no backend version, so a sync
  only changes snapshots whose content really changed. `example` values are
  dropped.

## Commands

```bash
npm run api:sync -- --schema backend.json <slice…>  # resync slices (default: all) from that schema file or URL
npm run api:check                                   # committed *.gen.ts == codegen(snapshot)? exit 1 on drift
npm run api:check -- --fix <slice…>                 # …and overwrite a drifted client from its snapshot
npm run api:sync -- --check --schema backend.json   # committed snapshots == backend schema? exit 1 on drift
npm run api:sync -- --affected-by changed-files.txt # which slices does a change touch? ('*' = all)
```

Useful flags: `--diff` prints the differing lines per drifted slice (line
number, `-` actual, `+` expected; capped at 20), `--fix` (with `api:check`)
regenerates a drifted client from its snapshot. Syncing needs `--schema`;
the snapshot-only modes (`api:check`, `--affected-by`) run without one.

The source schema is the scoped, translated export from
`studio-backend-bundle`: run `bin/console pimcore:studio-api:generate-config-json`
there and pass the file via `--schema`, or skip the local commands entirely and
dispatch the **Studio API Slice Sync** workflow on your branch — it exports the
backend spec, syncs the slices and pushes the commit for you (see
[service-operations#1713](https://github.com/pimcore/service-operations/issues/1713)).

## Rules

- **Generated files are never edited or merged by hand** — not `schema/*.json`,
  not `*.gen.ts`. On a merge conflict in a `*.gen.ts`, take either side and run
  `npm run api:check -- --fix <slice>` to regenerate it from the snapshot. On a
  conflict in a snapshot, take either side and resync the slice from the
  backend (`--schema`, or the Studio API Slice Sync workflow); the result is
  correct by construction.
- Snapshots and their generated clients are committed **together**. CI
  (`Studio API Client Check`) verifies exactly the slices a PR touches and
  fails on drift; drift in unrelated slices is only a warning there.
- `openapi-config.ts` carries hand-written `endpointOverrides` (POST endpoints
  that are reads and must not invalidate caches). They match by operation name
  and are **not** regenerable.
