/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  AdvancedManyToManyRelation, type RelationColumnDefinition, type AdvancedManyToManyRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/advanced-many-to-many-relation/advanced-many-to-many-relation'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  convertAllowedTypes,
  type IRelationAllowedTypesClassDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import {
  ManyToManyRelationLabel
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/components/label/label'
import { addDefaultWithToColumnDefinition, calculateColumnWithOfTableCells } from '@Pimcore/modules/element/dynamic-types/utils/column-helper'
import { type ColumnMeta } from '@tanstack/react-table'
import type { FormItemProps } from 'antd/es/form/FormItem'
import React from 'react'
import { AdvancedManyToManyRelationList } from '../../grid-cell-preview/advanced-many-to-many-relation/advanced-many-to-many-relation'
import { type AdvancedManyToManyRelationValue } from '../helpers/relations/types/advanced-many-to-many-relation'
import { type AdvancedManyToManyObjectRelationObjectDataDefinition } from './dynamic-type-object-data-advanced-many-to-many-object-relation'
import { isNil } from 'lodash'

export type AdvancedManyToManyRelationObjectDataDefinition = AbstractObjectDataDefinition & IRelationAllowedTypesClassDefinition & AdvancedManyToManyRelationClassDefinitionProps

export class DynamicTypeObjectDataAdvancedManyToManyRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'advancedManyToManyRelation'
  supportsBatchAppendModes: boolean = true
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'XL',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: AdvancedManyToManyRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const columns: RelationColumnDefinition[] = !isNil(props.columns)
      ? addDefaultWithToColumnDefinition(props.columns)
      : []

    return (
      <AdvancedManyToManyRelation
        { ...props }
        { ...convertAllowedTypes(props) }
        className={ props.className }
        columns={ columns }
        disabled={ props.noteditable === true }
      />
    )
  }

  getObjectDataFormItemProps (props: AdvancedManyToManyRelationObjectDataDefinition): FormItemProps {
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
    const value: AdvancedManyToManyRelationValue | null = props.cellProps.getValue()
    const objectProps: AdvancedManyToManyObjectRelationObjectDataDefinition = props.objectProps as AdvancedManyToManyObjectRelationObjectDataDefinition

    return (
      <AdvancedManyToManyRelationList
        columnDefinition={ objectProps.columns ?? null }
        value={ value }
      />
    )
  }

  getDefaultGridColumnWidth (props: ColumnMeta<any, any>): number | undefined {
    return calculateColumnWithOfTableCells(props)
  }
}
