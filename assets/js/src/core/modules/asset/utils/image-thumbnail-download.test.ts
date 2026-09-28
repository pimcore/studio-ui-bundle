/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { queryImageThumbnailDownload } from './image-thumbnail-download'

const responseWithHeaders = (headers: Record<string, string>): { response: Response } => ({
  response: { headers: new Headers(headers) } as unknown as Response
})

describe('queryImageThumbnailDownload', () => {
  it('requests the thumbnail through the Studio API with an encoded thumbnail name', async () => {
    const baseQuery = jest.fn().mockResolvedValue({ data: new Blob(['image']), meta: responseWithHeaders({}) })

    await queryImageThumbnailDownload({ id: 42, thumbnailName: 'web large/v2' }, baseQuery)

    expect(baseQuery).toHaveBeenCalledWith(expect.objectContaining({
      url: '/pimcore-studio/api/assets/42/image/download/thumbnail/web%20large%2Fv2'
    }))
  })

  it('reads the body as a blob', async () => {
    const baseQuery = jest.fn().mockResolvedValue({ data: new Blob(['image']), meta: responseWithHeaders({}) })

    await queryImageThumbnailDownload({ id: 42, thumbnailName: 'web-large' }, baseQuery)

    const { responseHandler } = baseQuery.mock.calls[0][0]
    const blob = new Blob(['bytes'])
    await expect(responseHandler({ blob: async () => blob })).resolves.toBe(blob)
  })

  it('returns the blob with the filename the server suggests', async () => {
    const blob = new Blob(['image'])
    const baseQuery = jest.fn().mockResolvedValue({
      data: blob,
      meta: responseWithHeaders({ 'Content-Disposition': 'attachment; filename="photo.webp"' })
    })

    const result = await queryImageThumbnailDownload({ id: 42, thumbnailName: 'web-large' }, baseQuery)

    expect(result).toEqual({ data: { blob, filename: 'photo.webp' } })
  })

  it('returns no filename when the server suggests none', async () => {
    const blob = new Blob(['image'])
    const baseQuery = jest.fn().mockResolvedValue({ data: blob, meta: responseWithHeaders({}) })

    const result = await queryImageThumbnailDownload({ id: 42, thumbnailName: 'web-large' }, baseQuery)

    expect(result).toEqual({ data: { blob, filename: undefined } })
  })

  it('passes a failed request on as an error', async () => {
    const error = { status: 404, data: new Blob(['not found']) }
    const baseQuery = jest.fn().mockResolvedValue({ error })

    const result = await queryImageThumbnailDownload({ id: 42, thumbnailName: 'web-large' }, baseQuery)

    expect(result).toEqual({ error })
  })
})
