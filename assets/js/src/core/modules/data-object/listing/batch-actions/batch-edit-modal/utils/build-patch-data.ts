/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isBoolean, isUndefined } from 'lodash'

export interface DataObjectPatchData {
  published?: boolean
  editableData: Record<string, unknown>
}

const PUBLISHED_KEY = 'published'

/**
 * Splits batch edit form values into the shape the data object patch endpoint expects.
 *
 * "published" is a system field: the backend applies it from the top level of a patch item
 * (PublishAdapter) and silently ignores it inside editableData, which only carries class fields.
 */
export const buildPatchData = (values: Record<string, unknown>): DataObjectPatchData => {
  const { [PUBLISHED_KEY]: published, ...editableData } = values

  if (isUndefined(published)) {
    return { editableData }
  }

  if (!isBoolean(published)) {
    throw new Error(`Batch edit value for "${PUBLISHED_KEY}" must be a boolean, got ${typeof published}`)
  }

  return { published, editableData }
}
