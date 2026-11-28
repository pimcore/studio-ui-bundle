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
npm run api:sync -- <slice…>                        # resync slices (default: all) from the source schema
npm run api:sync -- emails --schema backend.json    # … from another schema file or URL
npm run api:check                                   # committed *.gen.ts == codegen(snapshot)? exit 1 on drift
npm run api:sync -- --check --schema backend.json   # committed snapshots == backend schema? exit 1 on drift
npm run api:sync -- --affected-by changed-files.txt # which slices does a change touch? ('*' = all)
```

Useful flags: `--diff` prints a unified diff per drifted slice, `--fix` (with
`api:check`) regenerates a drifted client from its snapshot.

The default source schema is `./docs.jsonopenapi.json`, the aggregated document
of a running instance. It will be replaced by a scoped, translated export from
`studio-backend-bundle` (`pimcore:studio-api:generate-config-json`) — see
[service-operations#1713](https://github.com/pimcore/service-operations/issues/1713).

## Rules

- **Generated files are never edited or merged by hand** — not `schema/*.json`,
  not `*.gen.ts`. On a merge conflict, take either side and regenerate with
  `npm run api:sync -- <slice>`; the result is correct by construction.
- Snapshots and their generated clients are committed **together**. CI
  (`Studio API Client Check`) verifies exactly the slices a PR touches and
  fails on drift; drift in unrelated slices is only a warning there.
- `openapi-config.ts` carries hand-written `endpointOverrides` (POST endpoints
  that are reads and must not invalidate caches). They match by operation name
  and are **not** regenerable.
