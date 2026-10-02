/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

/**
 * Classification store columns carry their groupId/keyId in the persisted column config. A persisted
 * column without a config (e.g. the bare default column) must resolve to an empty object, never to a
 * boolean, because the grid data endpoint requires an array/object config.
 */
export const resolveColumnConfig = (
  availableColumn: Pick<AvailableColumn, 'type' | 'config'>,
  persistedColumn: object
): AvailableColumn['config'] => {
  if (availableColumn.type !== 'dataobject.classificationstore') {
    return availableColumn.config
  }

  const config: unknown = 'config' in persistedColumn ? persistedColumn.config : undefined
  return typeof config === 'object' && config !== null ? config : {}
}
