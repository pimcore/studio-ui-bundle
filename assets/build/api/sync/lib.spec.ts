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

import { affectedSlices, canonicalize, coverageReport, sliceSpec } from './lib'

describe('canonicalize', () => {
  it('sorts object keys alphabetically in ordinary objects', () => {
    const result = canonicalize({ schema: { type: 'integer', minimum: 1 } })

    expect(Object.keys((result as any).schema)).toEqual(['minimum', 'type'])
  })

  it('keeps the key order of paths and of the path items below them', () => {
    const result = canonicalize({
      paths: {
        '/b': { put: {}, get: {} },
        '/a': { post: {}, delete: {} }
      }
    }) as any

    expect(Object.keys(result.paths)).toEqual(['/b', '/a'])
    expect(Object.keys(result.paths['/b'])).toEqual(['put', 'get'])
    expect(Object.keys(result.paths['/a'])).toEqual(['post', 'delete'])
  })

  it('keeps the key order of properties objects', () => {
    const result = canonicalize({
      schema: {
        properties: {
          zebra: { type: 'string' },
          alpha: { type: 'string' }
        }
      }
    }) as any

    expect(Object.keys(result.schema.properties)).toEqual(['zebra', 'alpha'])
  })

  it('keeps the key order of responses objects', () => {
    const result = canonicalize({
      responses: {
        default: { description: 'z' },
        '500': { description: 'a' }
      }
    }) as any

    // '500' is integer-like, so JS object iteration puts it first on both
    // sides (source and snapshot) — the invariant is that canonicalize does
    // not re-sort what object iteration yields.
    expect(Object.keys(result.responses)).toEqual(Object.keys({
      default: { description: 'z' },
      '500': { description: 'a' }
    }))
  })

  it('drops example keys at any depth and keeps array order', () => {
    const result = canonicalize({
      schema: {
        example: 'drop me',
        enum: ['b', 'a'],
        items: { example: 42, type: 'integer' }
      }
    }) as any

    expect(result.schema.example).toBeUndefined()
    expect(result.schema.items.example).toBeUndefined()
    expect(result.schema.enum).toEqual(['b', 'a'])
    expect(result.schema.items.type).toBe('integer')
  })
})

describe('sliceSpec', () => {
  const spec = {
    openapi: '3.1.0',
    info: { title: 'Studio Backend API', version: '2026.2' },
    paths: {
      '/pimcore-studio/api/tags': {
        get: {
          operationId: 'tag_get_collection',
          responses: {
            200: { $ref: '#/components/responses/TagList' },
            500: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
          }
        }
      },
      '/pimcore-studio/api/emails': {
        get: { operationId: 'email_get_collection', responses: {} }
      }
    },
    components: {
      responses: {
        TagList: { content: { 'application/json': { schema: { $ref: '#/components/schemas/Tag' } } } }
      },
      schemas: {
        Tag: { properties: { parent: { $ref: '#/components/schemas/Tag' }, meta: { $ref: '#/components/schemas/Meta' } } },
        Meta: { type: 'object' },
        Error: { type: 'object' },
        Unrelated: { type: 'object' }
      }
    }
  }

  it('keeps only the paths matching the slice pattern', () => {
    const result = sliceSpec(spec, { name: 'tags', pattern: /api\/tag/i }) as any

    expect(Object.keys(result.paths)).toEqual(['/pimcore-studio/api/tags'])
  })

  it('copies transitively referenced components, including self-references', () => {
    const result = sliceSpec(spec, { name: 'tags', pattern: /api\/tag/i }) as any

    expect(Object.keys(result.components.schemas).sort()).toEqual(['Error', 'Meta', 'Tag'])
    expect(Object.keys(result.components.responses)).toEqual(['TagList'])
    expect(result.components.schemas.Unrelated).toBeUndefined()
  })

  it('writes a slice-scoped info block without a backend version', () => {
    const result = sliceSpec(spec, { name: 'tags', pattern: /api\/tag/i }) as any

    expect(result.openapi).toBe('3.1.0')
    expect(result.info).toEqual({ title: 'Studio Backend API (slice: tags)', version: 'snapshot' })
  })
})

describe('affectedSlices', () => {
  const slices = [
    { name: 'tags', outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts' },
    { name: 'emails', outputFile: '../../js/src/core/modules/email/emails-api-slice.gen.ts' }
  ]

  it('maps a changed snapshot to its slice', () => {
    const result = affectedSlices(['assets/build/api/schema/tags.json'], slices)

    expect(result).toEqual(['tags'])
  })

  it('maps a changed generated client to its slice', () => {
    const result = affectedSlices(['assets/js/src/core/modules/email/emails-api-slice.gen.ts'], slices)

    expect(result).toEqual(['emails'])
  })

  it('returns "*" when generator, config or lockfile changed', () => {
    expect(affectedSlices(['assets/build/api/openapi-config.ts'], slices)).toBe('*')
    expect(affectedSlices(['assets/build/api/slices.ts'], slices)).toBe('*')
    expect(affectedSlices(['assets/build/api/sync/lib.ts'], slices)).toBe('*')
    expect(affectedSlices(['assets/package-lock.json'], slices)).toBe('*')
  })

  it('ignores unrelated files and absolute path prefixes', () => {
    expect(affectedSlices(['assets/js/src/core/modules/email/other.ts'], slices)).toEqual([])
    expect(affectedSlices(['/home/runner/work/repo/repo/assets/build/api/schema/tags.json'], slices)).toEqual(['tags'])
  })

  it('does not treat the removed aggregated schema as a global trigger', () => {
    expect(affectedSlices(['assets/build/api/docs.jsonopenapi.json'], slices)).toEqual([])
  })

  it('works for bundles with the assets/studio layout', () => {
    expect(affectedSlices(['assets/studio/build/api/schema/tags.json'], slices)).toEqual(['tags'])
    expect(affectedSlices(['assets/studio/js/src/core/modules/email/emails-api-slice.gen.ts'], slices)).toEqual(['emails'])
    expect(affectedSlices(['assets/studio/build/api/slices.ts'], slices)).toBe('*')
    expect(affectedSlices(['assets/studio/package-lock.json'], slices)).toBe('*')
  })
})

describe('coverageReport', () => {
  const spec = {
    openapi: '3.1.0',
    info: { title: 't', version: 'v' },
    paths: {
      '/pimcore-studio/api/tags': { get: { operationId: 'a' }, post: { operationId: 'b' } },
      '/pimcore-studio/api/elements/usage': { get: { operationId: 'c' } },
      '/pimcore-studio/api/bundle/foreign/thing': { get: { operationId: 'd' } }
    }
  }
  const slices = [
    { name: 'tags', pattern: /api\/tag/i },
    { name: 'element', pattern: /api\/elements/i },
    { name: 'usage', pattern: /api\/elements\/usage/i }
  ]

  it('lists operations assigned to no slice and to more than one slice', () => {
    const result = coverageReport(spec, slices)

    expect(result.unassigned).toEqual(['get /pimcore-studio/api/bundle/foreign/thing'])
    expect(result.multi).toEqual([
      { operation: 'get /pimcore-studio/api/elements/usage', slices: ['element', 'usage'] }
    ])
  })
})
