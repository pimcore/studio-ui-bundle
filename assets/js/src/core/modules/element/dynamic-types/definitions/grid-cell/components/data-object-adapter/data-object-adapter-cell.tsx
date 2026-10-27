/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useInjection } from '@Pimcore/app/depency-injection'
import { isObject, isString } from 'lodash'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { Alert } from 'antd'
import { type DynamicTypeObjectDataRegistry } from '../../../objects/data-related/dynamic-type-object-data-registry'
import { DefaultModeCell } from './types/default-mode-cell'
import { EditModalCell } from './types/edit-modal-mode-cell'
import { type AbstractObjectDataDefinition } from '../../../objects/data-related/dynamic-type-object-data-abstract'
import { ColumnMetaCell } from './types/column-meta-cell'
import { InheritanceLayer } from './inheritance-layer'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { useEditMode } from '@Pimcore/components/grid/grid'
import { useLanguageSelection } from '@Pimcore/components/language-selection/provider/use-language-selection'
import { useResolvedFieldName } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/utils/resolve-field-name'

export interface DataObjectAdapterCellProps extends DefaultCellProps {}

export const DataObjectAdapterCell = (props: DataObjectAdapterCellProps): React.JSX.Element => {
  const { decodeColumnIdentifier } = useSelectedColumns()
  const type = props.column.columnDef.meta?.config?.dataObjectType
  const config = props.column.columnDef.meta?.config?.dataObjectConfig
  const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  const { isInEditMode } = useEditMode(props)
  const currentLanguage = useLanguageSelection().currentLanguage
  // Mirror DataComponent's role in the editor: derive the dot-notation
  // combinedFieldName from the cell's column context and put it on objectProps
  // so the field component receives it as a normal prop.
  const combinedFieldName = useResolvedFieldName(props.column.id, undefined)

  if (config !== undefined && !isObject(config)) {
    throw new Error('Invalid data object config')
  }

  if (type === undefined || !isString(type) || ((isString(type) && !objectDataRegistry.hasDynamicType(type)))) {
    return (
      <div className={ ['default-cell__content'].join(' ') }>
        <Alert
          message={ `type ${type} not supported` }
          type="warning"
        />
      </div>
    )
  }

  const fieldDefinition = config?.fieldDefinition ?? {}
  const enrichedObjectProps = { ...fieldDefinition, combinedFieldName }
  const column = decodeColumnIdentifier(props.column.id)
  const apiColumns = props?.row?.original?.['__api-data']

  const currentApiColumn = apiColumns?.columns?.find((apiColumn) => {
    if (column?.type === 'dataobject.classificationstore') {
      const apiColumnKey = column.key!.split('.')[0]

      if (column?.localizable) {
        return column.key === apiColumnKey && (column.locale ?? currentLanguage) === apiColumn.locale && apiColumn.additionalAttributes.groupId === column.config.groupId && apiColumn.additionalAttributes.keyId === column.config.keyId
      }

      return column.key === apiColumnKey && apiColumn.additionalAttributes.groupId === column.config.groupId && apiColumn.additionalAttributes.keyId === column.config.keyId
    }

    if (column?.localizable === true) {
      return apiColumn.key === column?.key && (column.locale ?? currentLanguage) === apiColumn.locale
    }

    return apiColumn.key === column?.key
  })

  const dynType = objectDataRegistry.getDynamicType(type)
  const cellDefinition = dynType.getGridCellDefinition({
    cellProps: props,
    objectProps: enrichedObjectProps as AbstractObjectDataDefinition
  })

  if (cellDefinition.mode === 'default') {
    return (
      <InheritanceLayer
        inherited={ currentApiColumn?.inheritance?.inherited === true && !isInEditMode }
        objectId={ currentApiColumn?.inheritance?.objectId }
      >
        <DefaultModeCell
          cellProps={ props }
          objectCellDefinition={ cellDefinition }
        />
      </InheritanceLayer>
    )
  }

  if (cellDefinition.mode === 'edit-modal') {
    return (
      <EditModalCell
        cellProps={ props }
        objectCellDefinition={ cellDefinition }
      />
    )
  }

  if (cellDefinition.mode === 'column-meta') {
    return (
      <InheritanceLayer
        inherited={ currentApiColumn?.inheritance?.inherited === true && !isInEditMode }
        objectId={ currentApiColumn?.inheritance?.objectId }
      >
        <ColumnMetaCell
          cellProps={ props }
          objectCellDefinition={ cellDefinition }
        />
      </InheritanceLayer>
    )
  }

  throw new Error('Invalid cell definition')
}
