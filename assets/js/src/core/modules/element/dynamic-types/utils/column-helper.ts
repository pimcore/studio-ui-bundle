/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useInjection } from '@Pimcore/app/depency-injection'
import { type RelationColumnDefinition } from '../definitions/objects/data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { type DynamicTypeObjectDataRegistry } from '../definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export const DEFAULT_COLUMN_WIDTH = 150

export const addDefaultWithToColumnDefinition = (columns: RelationColumnDefinition[]): RelationColumnDefinition[] => {
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const tmpColumns: RelationColumnDefinition[] = []

  columns.forEach(column => {
    if (column.width !== undefined) {
      tmpColumns.push(column)
      return
    }

    const dynType = objectDataRegistry.getDynamicType(column.type!, false)
    if (dynType?.getDefaultGridColumnWidth !== undefined) {
      tmpColumns.push({
        ...column,
        width: dynType.getDefaultGridColumnWidth()
      })

      return
    }

    tmpColumns.push({
      ...column,
      width: DEFAULT_COLUMN_WIDTH
    })
  })

  return columns
}
