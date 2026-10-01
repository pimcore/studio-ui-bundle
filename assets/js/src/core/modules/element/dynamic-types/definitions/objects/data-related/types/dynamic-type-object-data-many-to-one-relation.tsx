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
import {
  ManyToOneRelation, type ManyToOneRelationValue, type ManyToOneRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'

import {
  convertAllowedTypes,
  type IRelationAllowedTypesClassDefinition
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import {
  supportsInlineSearch
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/inline-search'
import {
  ManyToOneRelationComboField
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/components/combo-field/many-to-one-relation-combo-field'
import { FormattedRelationList } from '../../grid-cell-preview/relation-list/formatted-relation-list'
import { isNil } from 'lodash'
import { type DynamicTypeFieldFilterAbstract } from '../../../field-filters/dynamic-type-field-filter-abstract'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export type ManyToOneRelationObjectDataDefinition = AbstractObjectDataDefinition & IRelationAllowedTypesClassDefinition & ManyToOneRelationClassDefinitionProps & {
  displayMode?: string | null
}

export class DynamicTypeObjectDataManyToOneRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'manyToOneRelation'
  dynamicTypeFieldFilterType: DynamicTypeFieldFilterAbstract = container.get(serviceIds['DynamicTypes/FieldFilter/Relation'])
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'L',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: ManyToOneRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const allowedTypes = convertAllowedTypes(props)

    if (this.usesInlineSearch(props)) {
      return (
        <ManyToOneRelationComboField
          { ...props }
          { ...allowedTypes }
          className={ props.className }
          disabled={ props.noteditable === true }
          inherited={ props.inherited }
        />
      )
    }

    return (
      <ManyToOneRelation
        { ...props }
        { ...allowedTypes }
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
      />
    )
  }

  getVersionObjectDataComponent (props: ManyToOneRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return this.getObjectDataComponent({ ...props, noteditable: true, hideOpenButton: true })
  }

  /**
   * The grid renders its editor through here. It has no element context, but the row
   * being edited is known — pass it on so the inline search can resolve its labels
   * through the field's path formatter.
   */
  getGridCellEditComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const objectProps = props.objectProps as ManyToOneRelationObjectDataDefinition
    const allowedTypes = convertAllowedTypes(objectProps)

    if (!this.usesInlineSearch(objectProps)) {
      return super.getGridCellEditComponent(props)
    }

    return (
      <ManyToOneRelationComboField
        { ...objectProps }
        { ...allowedTypes }
        className={ objectProps.className }
        disabled={ objectProps.noteditable === true }
        objectId={ props.cellProps.row.original.id as number | undefined }
      />
    )
  }

  private usesInlineSearch (props: ManyToOneRelationObjectDataDefinition): boolean {
    return props.displayMode === 'combo' && supportsInlineSearch(props)
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: ManyToOneRelationValue | null = props.cellProps.getValue()
    const objectProps = props.objectProps as ManyToOneRelationObjectDataDefinition
    const dataObjectId = props.cellProps.row.original.id as number | undefined

    return isNil(value)
      ? <></>
      : (
        <FormattedRelationList
          columnId={ props.cellProps.column.id }
          dataObjectId={ dataObjectId }
          fieldNameFallback={ objectProps.combinedFieldName }
          pathFormatterClass={ objectProps.pathFormatterClass }
          relations={ [value] }
        />
        )
  }

  getDefaultGridColumnWidth (): number | undefined {
    return 350
  }
}
