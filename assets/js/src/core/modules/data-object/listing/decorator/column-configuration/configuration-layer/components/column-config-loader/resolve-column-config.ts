/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNumber, isObject } from 'lodash'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

const CLASSIFICATION_STORE_TYPE = 'dataobject.classificationstore'

/**
 * The grid endpoint addresses a classification store column by a numeric groupId and keyId and rejects
 * the whole request for a column without them (e.g. the bare default column).
 */
export const isKeylessClassificationStoreColumn = (column: { type: string, config?: unknown }): boolean => {
  if (column.type !== CLASSIFICATION_STORE_TYPE) {
    return false
  }

  const { config } = column
  if (!isObject(config)) {
    return true
  }

  const { groupId, keyId } = config as { groupId?: unknown, keyId?: unknown }
  return !isNumber(groupId) || !isNumber(keyId)
}

/**
 * Classification store columns carry their groupId/keyId in the persisted column config, all other
 * column types use the config of the available column.
 */
export const resolveColumnConfig = (
  availableColumn: Pick<AvailableColumn, 'type' | 'config'>,
  persistedColumn: { config?: AvailableColumn['config'] }
): AvailableColumn['config'] | undefined => {
  return availableColumn.type === CLASSIFICATION_STORE_TYPE ? persistedColumn.config : availableColumn.config
}

/**
 * Leaves out the columns the grid endpoint cannot resolve.
 */
export const filterRequestableColumns = <T extends { type: string, config?: unknown }>(columns: T[]): T[] => {
  return columns.filter(column => !isKeylessClassificationStoreColumn(column))
}
