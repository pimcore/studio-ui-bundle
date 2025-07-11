/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { Alert } from 'antd'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeGridCellRegistry } from '../../../dynamic-type-grid-cell-registry'
import { type ElementInfo } from '../../element-cell/element-cell'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { type WebsiteSettingsObjectData } from '@Pimcore/modules/website-settings/website-settings-api-slice.gen'
import { type ElementCellContentProps } from '../../element-cell/element-cell-content'
import { addColumnConfig } from '@sdk/components'

const typeMapping = {
  text: 'input',
  bool: 'checkbox',
  document: 'element',
  object: 'element',
  asset: 'element'
}

export const ValueCell = (props: DefaultCellProps): React.JSX.Element => {
  const settingType = props.row.original.type as string
  const gridCellRegistry = useInjection<DynamicTypeGridCellRegistry>('DynamicTypes/GridCellRegistry')
  const type: string = typeMapping[settingType] ?? settingType
  const { mapToElementType } = useElementHelper()

  const renderCell = (): React.JSX.Element => {
    if (!gridCellRegistry.hasDynamicType(type)) {
      return (
        <Alert
          message="cell type not supported"
          style={ { display: 'flex' } }
          type="warning"
        />
      )
    }

    const dynamicType = gridCellRegistry.getDynamicType(type)

    const enrichedProps: ElementCellContentProps = {
      ...props,
      ...addColumnConfig(props, { allowedTypes: [mapToElementType(String(props.row.original.type), true)] }),      getElementInfo: (cellProps: DefaultCellProps): ElementInfo => {
        const row = cellProps.row.original
        const element: WebsiteSettingsObjectData = row.data
        return {
          elementType: mapToElementType(String(row.type), true),
          id: element.id,
          fullPath: element.fullPath
        }
      }
    }

    return dynamicType.getGridCellComponent(enrichedProps)
  }

  return (
    <>
      {renderCell()}
    </>
  )
}
