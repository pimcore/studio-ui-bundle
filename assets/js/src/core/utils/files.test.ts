/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { downloadFromUrlWithCheck } from './files'

describe('downloadFromUrlWithCheck', () => {
  let clickSpy: jest.Mock

  beforeEach(() => {
    clickSpy = jest.fn()
    jest.spyOn(document, 'createElement').mockReturnValue({
      download: '',
      href: '',
      click: clickSpy
    } as unknown as HTMLAnchorElement)
  })

  afterEach(() => {
    jest.restoreAllMocks()
    // @ts-expect-error cleanup test global
    delete global.fetch
  })

  it('downloads when the check reports available', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ available: true })
    }) as unknown as typeof fetch

    const result = await downloadFromUrlWithCheck('http://x/dl/23', 'http://x/dl/23/available')

    expect(result).toBe(true)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })

  it('does not download when the check reports unavailable', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ available: false })
    }) as unknown as typeof fetch

    const result = await downloadFromUrlWithCheck('http://x/dl/23', 'http://x/dl/23/available')

    expect(result).toBe(false)
    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('does not download when the check responds non-ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({})
    }) as unknown as typeof fetch

    const result = await downloadFromUrlWithCheck('http://x/dl/23', 'http://x/dl/23/available')

    expect(result).toBe(false)
    expect(clickSpy).not.toHaveBeenCalled()
  })

  it('attempts the download when the check endpoint errors', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as unknown as typeof fetch

    const result = await downloadFromUrlWithCheck('http://x/dl/23', 'http://x/dl/23/available')

    expect(result).toBe(true)
    expect(clickSpy).toHaveBeenCalledTimes(1)
  })
})
