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
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  ManyToManyRelationLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/components/label/label'
import {
  AdvancedManyToManyObjectRelation, type RelationColumnDefinition, type AdvancedManyToManyObjectRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import { type AdvancedManyToManyRelationValue } from '../helpers/relations/types/advanced-many-to-many-relation'
import { AdvancedManyToManyRelationList } from '../../grid-cell-preview/advanced-many-to-many-relation/advanced-many-to-many-relation'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '../dynamic-type-object-data-registry'
import { type ColumnMeta } from '@tanstack/react-table'
import { isNil } from 'lodash'

export type AdvancedManyToManyObjectRelationObjectDataDefinition = AbstractObjectDataDefinition & AdvancedManyToManyObjectRelationClassDefinitionProps

export class DynamicTypeObjectDataAdvancedManyToManyObjectRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'advancedManyToManyObjectRelation'
  supportsBatchAppendModes: boolean = true
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  columnDefaultWidth: number = 250

  getObjectDataComponent (props: AdvancedManyToManyObjectRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const columns: RelationColumnDefinition[] = []
    const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

    if (!isNil(props.columns)) {
      props.columns.forEach(column => {
        const dynType = objectDataRegistry.getDynamicType(column.type!, false)
        if (dynType?.getDefaultGridColumnWidth !== undefined) {
          columns.push({
            ...column,
            width: dynType.getDefaultGridColumnWidth()
          })

          return
        }

        columns.push({
          ...column,
          width: this.columnDefaultWidth
        })
      })
    }

    return (
      <AdvancedManyToManyObjectRelation
        { ...props }
        className={ props.className }
        columns={ columns }
        disabled={ props.noteditable === true }
      />
    )
  }

  getObjectDataFormItemProps (props: AdvancedManyToManyObjectRelationObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <ManyToManyRelationLabel

        disabled={ props.noteditable === true }
        label={ props.title }
        name={ props.name }
             />
    }
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
    const value: AdvancedManyToManyRelationValue | null = props.cellProps.getValue()
    const objectProps: AdvancedManyToManyObjectRelationObjectDataDefinition = props.objectProps as AdvancedManyToManyObjectRelationObjectDataDefinition
    const columns: RelationColumnDefinition[] = []

    if (!isNil(objectProps.columns)) {
      objectProps.columns.forEach(column => {
        const dynType = objectDataRegistry.getDynamicType(column.type!, false)
        if (dynType?.getDefaultGridColumnWidth !== undefined) {
          columns.push({
            ...column,
            width: dynType.getDefaultGridColumnWidth()
          })

          return
        }

        columns.push({
          ...column,
          width: this.columnDefaultWidth
        })
      })
    }

    return (
      <AdvancedManyToManyRelationList
        columnDefinition={ columns }
        value={ value }
      />
    )
  }

  getDefaultGridColumnWidth (props: ColumnMeta<any, any>): number | undefined {
    const objectDataRegistry = useInjection<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
    const fieldDefinition = props.config?.dataObjectConfig.fieldDefinition
    const columns = fieldDefinition?.columns ?? null
    let calcColumnWidth = 350

    if (columns !== null) {
      columns.forEach(column => {
        console.log('column', column)
        const dynType = objectDataRegistry.getDynamicType(column.type as string, false)
        if (dynType?.getDefaultGridColumnWidth !== undefined) {
          console.log('dynType', dynType)
          const columnWidth = dynType.getDefaultGridColumnWidth(props)
          if (columnWidth !== undefined) {
            console.log('add specific column width', columnWidth)
            calcColumnWidth += columnWidth
            return
          }
        }

        console.log('add default column width', this.columnDefaultWidth)
        calcColumnWidth += this.columnDefaultWidth
      })
    }

    console.log('calcColumnWidth', calcColumnWidth)

    return calcColumnWidth
  }
}
