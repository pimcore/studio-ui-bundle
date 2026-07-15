/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type NamePath } from 'antd/es/form/interface'
import { type BatchEdit } from '@Pimcore/modules/data-object/listing/batch-actions/batch-edit-modal/batch-edit-provider'

/**
 * Builds the antd Form.Item name path for a batch-edit field.
 *
 * Localized fields are keyed per language as ['localizedfields', key, locale] so the
 * submitted payload becomes editableData.localizedfields[key][locale] — which the
 * backend applies per language. Non-localized fields keep a flat [key] path.
 */
export const getBatchEditFieldName = (batchEdit: BatchEdit, locale?: string | null): NamePath => {
  if (batchEdit.localizable) {
    return ['localizedfields', batchEdit.key, (locale ?? batchEdit.locale)!]
  }

  return [batchEdit.key]
}
