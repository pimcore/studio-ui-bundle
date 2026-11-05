/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PreviewModeFallbackItem } from './preview-mode-provider'

export interface FallbackRow {
  id?: number | string
  fullpath?: string
  columns?: Array<{ key?: string, value?: unknown }>
}

/** The first grid row as fallback item; the path comes from its `fullpath` column when the row has no own field */
export const getFallbackItem = (row: FallbackRow | undefined): PreviewModeFallbackItem | null => {
  if (row?.id === undefined) {
    return null
  }

  const columnPath = row.columns?.find((column) => column.key === 'fullpath')?.value
  const fullpath = row.fullpath ?? (typeof columnPath === 'string' ? columnPath : undefined)

  return { id: row.id, fullpath }
}
