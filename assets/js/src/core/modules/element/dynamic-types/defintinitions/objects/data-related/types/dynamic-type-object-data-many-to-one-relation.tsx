/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import {
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract,
  type EditModalSettings,
  type EditMode,
  type GetGridCellDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  ManyToOneRelation, type ManyToOneRelationValue, type ManyToOneRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'

import {
  convertAllowedTypes,
  type IRelationAllowedTypesClassDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import { RelationList } from '../../grid-cell-preview/relation-list/relation-list'
import { isNil } from 'lodash'

export type ManyToOneRelationObjectDataDefinition = AbstractObjectDataDefinition & IRelationAllowedTypesClassDefinition & ManyToOneRelationClassDefinitionProps

export class DynamicTypeObjectDataManyToOneRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'manyToOneRelation'
  gridCellEditMode: EditMode = 'edit-modal'
  gridCellEditModalSettings: EditModalSettings = {
    modalSize: 'L',
    formLayout: 'vertical'
  }

  getObjectDataComponent (props: ManyToOneRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <ManyToOneRelation
        { ...props }
        { ... convertAllowedTypes(props) }
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
      />
    )
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: ManyToOneRelationValue | null = props.cellProps.getValue()

    return isNil(value) ? <></> : <RelationList relations={ [value] } />
  }
}
