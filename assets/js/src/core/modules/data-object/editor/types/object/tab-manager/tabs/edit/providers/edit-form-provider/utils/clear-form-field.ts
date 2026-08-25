/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { cloneDeep, set, type PropertyPath } from 'lodash'
import { type NamePath } from 'antd/es/form/interface'

/**
 * Marks a single field as empty within the accumulated modified-attributes map.
 *
 * The name is the Ant form path of the field, which is also the path the form uses
 * in its changedValues, so the resulting payload has the shape the backend expects
 * for that field. Values next to the cleared one (other locales of the
 * same field, other fields of the same brick) are kept.
 *
 * @param emptyValue What counts as empty for the field, see
 *   DynamicTypeObjectDataAbstract.getEmptyValue - null for most types, but e.g. the
 *   block API takes a list and rejects null.
 */
export const clearFormField = (
  current: Record<string, any>,
  name: NamePath,
  emptyValue: unknown = null
): Record<string, any> => {
  return set(cloneDeep(current), name as PropertyPath, emptyValue)
}
