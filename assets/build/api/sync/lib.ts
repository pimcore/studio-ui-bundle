/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

export interface SliceRef { name: string, pattern: RegExp }
export interface SliceOutput { name: string, outputFile: string }

export interface OpenApiSpec {
  openapi: string
  info: Record<string, unknown>
  paths: Record<string, Record<string, unknown>>
  components?: Record<string, Record<string, unknown>>
  [key: string]: unknown
}

/**
 * Keys whose object values keep their source order: codegen output depends on
 * the order of paths (endpoint order), properties (generated type fields) and
 * responses (response unions). Every other object gets its keys sorted so that
 * irrelevant source reordering never touches a snapshot.
 */
const ORDER_PRESERVING_KEYS = new Set(['paths', 'properties', 'responses'])

/** `example` values are unused by codegen and churn often, so they are dropped. */
const DROPPED_KEYS = new Set(['example'])

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const canonicalizeValue = (value: unknown, preserveOrder: boolean, preserveChildOrder: boolean): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => canonicalizeValue(item, false, false))
  }

  if (!isPlainObject(value)) {
    return value
  }

  const entries = Object.entries(value).filter(([key]) => !DROPPED_KEYS.has(key))

  if (!preserveOrder) {
    entries.sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
  }

  const result: Record<string, unknown> = {}
  for (const [key, child] of entries) {
    result[key] = canonicalizeValue(
      child,
      preserveChildOrder || ORDER_PRESERVING_KEYS.has(key),
      // children of `paths` are path items whose method order is kept too;
      // the preservation does not propagate any deeper than that
      key === 'paths'
    )
  }

  return result
}

export const canonicalize = (value: unknown): unknown => canonicalizeValue(value, false, false)

const REF_PATTERN = /^#\/components\/([^/]+)\/(.+)$/

const parseRef = (key: string, value: unknown): [string, string] | null => {
  const match = key === '$ref' && typeof value === 'string' ? REF_PATTERN.exec(value) : null

  return match === null ? null : [match[1], match[2]]
}

const walkNodeForRefs = (
  node: Record<string, unknown>,
  source: Record<string, Record<string, unknown>>,
  kept: Record<string, Record<string, unknown>>,
  stack: unknown[]
): void => {
  for (const [key, value] of Object.entries(node)) {
    const ref = parseRef(key, value)
    if (ref === null) {
      stack.push(value)
      continue
    }
    const [bucket, name] = ref
    const component = source[bucket]?.[name]
    if (component !== undefined && kept[bucket]?.[name] === undefined) {
      kept[bucket] = kept[bucket] ?? {}
      kept[bucket][name] = component
      stack.push(component)
    }
  }
}

/** Every component transitively referenced from the given paths, in source order per bucket. */
const referencedComponents = (
  paths: Record<string, Record<string, unknown>>,
  source: Record<string, Record<string, unknown>>
): Record<string, Record<string, unknown>> => {
  const kept: Record<string, Record<string, unknown>> = {}
  const stack: unknown[] = [paths]

  while (stack.length > 0) {
    const current = stack.pop()
    if (Array.isArray(current)) {
      stack.push(...current)
    } else if (isPlainObject(current)) {
      walkNodeForRefs(current, source, kept, stack)
    }
  }

  return kept
}

/**
 * Extracts one slice from the full spec: the paths matching the slice pattern
 * plus every component they transitively reference, under a slice-scoped info
 * block that deliberately carries no backend version, so a sync only touches
 * snapshots whose content really changed.
 */
export const sliceSpec = (spec: OpenApiSpec, slice: SliceRef): OpenApiSpec => {
  const paths: Record<string, Record<string, unknown>> = {}
  for (const [path, pathItem] of Object.entries(spec.paths)) {
    if (slice.pattern.test(path)) {
      paths[path] = pathItem
    }
  }

  const kept = referencedComponents(paths, spec.components ?? {})

  const result: OpenApiSpec = {
    openapi: spec.openapi,
    info: { title: `Studio Backend API (slice: ${slice.name})`, version: 'snapshot' },
    paths
  }
  if (Object.keys(kept).length > 0) {
    result.components = kept
  }

  return result
}

/** Serialized form of a snapshot: canonical, pretty-printed, one field per line. */
export const snapshotContent = (spec: OpenApiSpec, slice: SliceRef): string =>
  `${JSON.stringify(canonicalize(sliceSpec(spec, slice)), null, 2)}\n`

/**
 * Files whose change invalidates every slice: the generator configuration,
 * the sync tool itself and the dependency lockfile. Matched as path suffixes
 * so the same rules work for the assets/ and the assets/studio layouts, and
 * for absolute paths a CI checkout produces. Over-matching (e.g. another
 * package.json somewhere in the repository) errs towards checking every
 * slice, which is safe.
 */
const GLOBAL_TRIGGER_SUFFIXES = [
  'build/api/openapi-config.ts',
  'build/api/slices.ts',
  'package.json',
  'package-lock.json'
]
const GLOBAL_TRIGGER_SEGMENT = 'build/api/sync/'

const normalizePath = (file: string): string => file.replaceAll('\\', '/')

const matchesSuffix = (file: string, suffix: string): boolean =>
  file === suffix || file.endsWith(`/${suffix}`)

const isGlobalTrigger = (file: string): boolean =>
  GLOBAL_TRIGGER_SUFFIXES.some((suffix) => matchesSuffix(file, suffix)) || file.includes(GLOBAL_TRIGGER_SEGMENT)

const snapshotSlice = (file: string, slices: SliceOutput[]): string | null => {
  const match = /(?:^|\/)build\/api\/schema\/([^/]+)\.json$/.exec(file)
  if (match === null) {
    return null
  }

  return slices.find((candidate) => candidate.name === match[1])?.name ?? null
}

const outputFileSlice = (file: string, slices: SliceOutput[]): string | null => {
  for (const slice of slices) {
    // outputFile is relative to build/api, e.g. ../../js/…/x.gen.ts
    const withoutDots = normalizePath(slice.outputFile).replace(/^(\.\.\/)+/, '')
    if (matchesSuffix(file, withoutDots)) {
      return slice.name
    }
  }

  return null
}

/**
 * Maps a list of changed files (repo-relative or absolute, as `git diff
 * --name-only` or a CI checkout produces them) to the slices they affect.
 * Returns '*' when a global trigger changed.
 */
export const affectedSlices = (changedFiles: string[], slices: SliceOutput[]): string[] | '*' => {
  const affected = new Set<string>()

  for (const file of changedFiles.map(normalizePath)) {
    if (isGlobalTrigger(file)) {
      return '*'
    }

    const slice = snapshotSlice(file, slices) ?? outputFileSlice(file, slices)
    if (slice !== null) {
      affected.add(slice)
    }
  }

  return [...affected]
}

export interface CoverageReport {
  unassigned: string[]
  multi: Array<{ operation: string, slices: string[] }>
}

const HTTP_METHODS = new Set(['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'])

/** Reports operations that belong to no slice, and operations claimed by more than one. */
export const coverageReport = (spec: OpenApiSpec, slices: SliceRef[]): CoverageReport => {
  const unassigned: string[] = []
  const multi: CoverageReport['multi'] = []

  for (const [path, pathItem] of Object.entries(spec.paths)) {
    const owners = slices.filter((slice) => slice.pattern.test(path)).map((slice) => slice.name)
    for (const method of Object.keys(pathItem)) {
      if (!HTTP_METHODS.has(method)) {
        continue
      }
      const operation = `${method} ${path}`
      if (owners.length === 0) {
        unassigned.push(operation)
      } else if (owners.length > 1) {
        multi.push({ operation, slices: owners })
      }
    }
  }

  return { unassigned, multi }
}
