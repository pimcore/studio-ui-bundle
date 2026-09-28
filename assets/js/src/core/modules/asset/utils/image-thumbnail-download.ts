/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import type { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { getFilenameFromContentDisposition } from '@Pimcore/utils/files'
import type { AssetImageDownloadByThumbnailApiArg } from '../asset-api-slice.gen'

export interface ImageThumbnailDownload {
  blob: Blob
  /** filename suggested by the server in the Content-Disposition header */
  filename?: string
}

type ThumbnailBaseQuery = (args: FetchArgs) => Promise<{
  data?: unknown
  error?: FetchBaseQueryError
  meta?: unknown
}>

/**
 * queryFn body of the image thumbnail download endpoint. Kept apart from the API slice so it can be
 * tested with a plain base query. The generated endpoint only yields the Blob; the download also needs
 * the filename, which the server derives from the thumbnail's output format.
 */
export const queryImageThumbnailDownload = async (
  { id, thumbnailName }: AssetImageDownloadByThumbnailApiArg,
  baseQuery: ThumbnailBaseQuery
): Promise<{ data: ImageThumbnailDownload } | { error: FetchBaseQueryError }> => {
  const result = await baseQuery({
    url: `/pimcore-studio/api/assets/${id}/image/download/thumbnail/${encodeURIComponent(thumbnailName)}`,
    responseHandler: async (response: Response): Promise<Blob> => await response.blob()
  })

  if (!isNil(result.error)) {
    return { error: result.error }
  }

  const meta = result.meta as FetchBaseQueryMeta | undefined
  const filename = getFilenameFromContentDisposition(meta?.response?.headers.get('Content-Disposition'))

  return { data: { blob: result.data as Blob, filename } }
}
