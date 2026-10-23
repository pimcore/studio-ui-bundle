/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isArray } from 'lodash'
import { type NamePath } from 'antd/es/form/interface'

/** The field name of the classification store, without the form path it is nested in. */
export const getClassificationStoreName = (name: NamePath): string => {
  return String(isArray(name) ? name[name.length - 1] : name)
}

/**
 * Parent for the combined field names of the keys of a group, so a key is addressed as
 * "<store>.<groupId>.<keyId>" towards the backend (e.g. to load dynamic select options).
 */
export const getKeyCombinedFieldNameParent = (classificationStoreName: string, groupId: number | string): string[] => {
  return [classificationStoreName, String(groupId)]
}
