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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  ManyToManyRelation, type ManyToManyRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-many-relation/many-to-many-relation'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  convertAllowedTypes, type IRelationAllowedTypesClassDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import {
  ManyToManyRelationLabel
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/components/label/label'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type ManyToManyRelationObjectDataDefinition = AbstractObjectDataDefinition & IRelationAllowedTypesClassDefinition & ManyToManyRelationClassDefinitionProps

export class DynamicTypeObjectDataManyToManyRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'manyToManyRelation'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'

  getObjectDataComponent (props: ManyToManyRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <ManyToManyRelation
        { ...props }
        { ... convertAllowedTypes(props) }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getObjectDataFormItemProps (props: ManyToManyRelationObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <ManyToManyRelationLabel
        label={ props.title }
        name={ props.name }
             />
    }
  }
}
