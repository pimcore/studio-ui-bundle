/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * The import endpoint and the one dry run that reads it. A replace is the only import that removes
 * anything, so a restore reports no removals even though the dry run answers.
 */

import { fetchImportReplaces, getStoreImportUrl } from './store-import-endpoint'

const STORE_ID = 11
const DRY_RUN_FIELD = 'dryRun'
const REMOVED_ENTRY = 'group "Dimensions"'

describe('getStoreImportUrl', () => {
  it('names the store the file is applied to', () => {
    expect(getStoreImportUrl(STORE_ID))
      .toBe(`/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}/import`)
  })
})

describe('fetchImportReplaces', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    globalThis.fetch = jest.fn() as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  const answer = (report: unknown): void => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => report
    }) as unknown as typeof fetch
  }

  const file = (): File => new File(['{}'], 'store.json', { type: 'application/json' })

  it('asks the endpoint for a dry run without importing', async () => {
    answer({ replaced: true, removed: 1, removedEntries: [REMOVED_ENTRY] })

    await fetchImportReplaces(STORE_ID, file())

    const [, init] = (globalThis.fetch as jest.Mock).mock.calls[0]
    expect((init.body as FormData).get(DRY_RUN_FIELD)).toBe('true')
  })

  it('says a file from another store replaces the configuration', async () => {
    answer({ replaced: true, removed: 1, removedEntries: [REMOVED_ENTRY] })

    await expect(fetchImportReplaces(STORE_ID, file())).resolves.toBe(true)
  })

  it('says a restore into the store the file describes replaces nothing', async () => {
    answer({ replaced: false, removed: 0, removedEntries: [] })

    await expect(fetchImportReplaces(STORE_ID, file())).resolves.toBe(false)
  })

  it('says it cannot tell when the dry run is refused', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({ ok: false }) as unknown as typeof fetch

    await expect(fetchImportReplaces(STORE_ID, file())).resolves.toBeNull()
  })
})
