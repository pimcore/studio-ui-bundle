/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { downloadFromUrlWithCheck, getFilenameFromContentDisposition } from './files'

describe('getFilenameFromContentDisposition', () => {
  it('returns the quoted filename of an attachment header', () => {
    expect(getFilenameFromContentDisposition('attachment; filename="photo.webp"')).toBe('photo.webp')
  })

  it('returns an unquoted filename', () => {
    expect(getFilenameFromContentDisposition('attachment; filename=photo.webp')).toBe('photo.webp')
  })

  it('prefers the RFC 5987 encoded filename when present', () => {
    expect(getFilenameFromContentDisposition(
      "attachment; filename=\"fallback.jpg\"; filename*=utf-8''caf%C3%A9%20photo.jpg"
    )).toBe('café photo.jpg')
  })

  it('decodes an ISO-8859-1 encoded filename', () => {
    expect(getFilenameFromContentDisposition("attachment; filename*=ISO-8859-1''%A3%20rates.jpg")).toBe('£ rates.jpg')
  })

  it('falls back to the plain filename when the encoded one uses an unsupported charset', () => {
    expect(getFilenameFromContentDisposition(
      "attachment; filename=\"fallback.jpg\"; filename*=shift_jis''%82%A0.jpg"
    )).toBe('fallback.jpg')
  })

  it('falls back to the plain filename when the encoded one is malformed', () => {
    expect(getFilenameFromContentDisposition(
      "attachment; filename=\"fallback.jpg\"; filename*=utf-8''%E0%A4%A.jpg"
    )).toBe('fallback.jpg')
  })

  it('keeps semicolons and escaped quotes inside a quoted filename', () => {
    expect(getFilenameFromContentDisposition('attachment; filename="a;b \\"c\\".jpg"')).toBe('a;b "c".jpg')
  })

  it('does not mistake filename* for a plain filename', () => {
    expect(getFilenameFromContentDisposition("attachment; filename*=shift_jis''%82%A0.jpg")).toBeUndefined()
  })

  it('returns undefined when the header is missing or has no filename', () => {
    expect(getFilenameFromContentDisposition(null)).toBeUndefined()
    expect(getFilenameFromContentDisposition('inline')).toBeUndefined()
  })
})

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
