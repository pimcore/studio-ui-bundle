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

export interface ThumbnailReloadState {
  /** The editable instance already refreshed the editor for this conversion. */
  alreadyTriggered: boolean
  /** The owner of the editable (e.g. an open editable dialog) holds reloads back. */
  deferReload: boolean
}

/**
 * The rendered video preview is stale while a named thumbnail is still converting. Once the
 * conversion ended the editor is reloaded once, unless the owner of the editable defers reloads:
 * a reload would save and destroy an open editable dialog before the user chose Save or Cancel.
 */
export const shouldReloadForThumbnailStatus = (
  thumbnailStatus: { status: string } | null | undefined,
  { alreadyTriggered, deferReload }: ThumbnailReloadState
): boolean => {
  if (isNil(thumbnailStatus) || alreadyTriggered || deferReload) {
    return false
  }

  return thumbnailStatus.status === 'finished' || thumbnailStatus.status === 'error'
}
