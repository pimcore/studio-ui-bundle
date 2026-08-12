/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { RcFile } from 'antd/es/upload/interface'
import { isNil, isString } from 'lodash'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export interface ResolveUploadActionOptions {
  /** Fixed endpoint supplied by the caller; wins over everything else. */
  action?: string
  targetFolderId: number
  /** Replace ID owned by the caller, e.g. from folder-drop conflict resolution. */
  getExternalReplaceId?: (file: RcFile) => number | undefined
  /** Replace ID from the built-in conflict handler. */
  getReplaceId: (file: RcFile) => number | undefined
  /** Per-file target folder, used when a dropped folder tree spans subfolders. */
  getTargetFolderIdForFile?: (file: RcFile) => number | undefined
}

/**
 * Endpoint a single file is uploaded to: replacing an existing asset when the
 * conflict was resolved that way, otherwise adding to the target folder.
 */
export const resolveUploadAction = (
  file: RcFile,
  {
    action,
    targetFolderId,
    getExternalReplaceId,
    getReplaceId,
    getTargetFolderIdForFile
  }: ResolveUploadActionOptions
): string => {
  if (isString(action)) {
    return action
  }

  // External replace ID (e.g. from folder-drop conflict resolution) takes
  // priority, then fall back to the built-in conflict handler's result.
  const replaceId = getExternalReplaceId?.(file) ?? getReplaceId(file)

  if (!isNil(replaceId)) {
    return `${getPrefix()}/assets/${replaceId}/replace`
  }

  const effectiveFolderId = getTargetFolderIdForFile?.(file) ?? targetFolderId

  return `${getPrefix()}/assets/add/${effectiveFolderId}`
}
