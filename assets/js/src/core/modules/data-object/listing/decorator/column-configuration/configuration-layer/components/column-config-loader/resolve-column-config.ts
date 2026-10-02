/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isFunction, isNumber, isObject } from 'lodash'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

const CLASSIFICATION_STORE_TYPE = 'dataobject.classificationstore'

/**
 * A classification store column is only addressable with a numeric groupId and keyId.
 */
export const hasClassificationStoreKey = (config: unknown): config is object => {
  if (!isObject(config) || isFunction(config)) {
    return false
  }

  const { groupId, keyId } = config as { groupId?: unknown, keyId?: unknown }
  return isNumber(groupId) && isNumber(keyId)
}

/**
 * Resolves the config of a persisted column. Returns `undefined` for a classification store column
 * without groupId/keyId (e.g. the bare default column): the grid endpoint rejects such a column, so
 * the caller must not select it.
 */
export const resolveColumnConfig = (
  availableColumn: Pick<AvailableColumn, 'type' | 'config'>,
  persistedColumn: { config?: unknown }
): AvailableColumn['config'] | undefined => {
  if (availableColumn.type !== CLASSIFICATION_STORE_TYPE) {
    return availableColumn.config
  }

  const { config } = persistedColumn
  return hasClassificationStoreKey(config) ? config : undefined
}
