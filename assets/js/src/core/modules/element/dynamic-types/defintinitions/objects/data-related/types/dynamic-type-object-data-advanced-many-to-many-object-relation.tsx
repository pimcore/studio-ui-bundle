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
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  ManyToManyRelationLabel
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/components/label/label'
import {
  AdvancedManyToManyObjectRelation, type AdvancedManyToManyObjectRelationClassDefinitionProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/advanced-many-to-many-object-relation/advanced-many-to-many-object-relation'
import type { InheritanceOverlayType } from '@Pimcore/components/inheritance-overlay/inheritance-overlay'

export type AdvancedManyToManyObjectRelationObjectDataDefinition = AbstractObjectDataDefinition & AdvancedManyToManyObjectRelationClassDefinitionProps

export class DynamicTypeObjectDataAdvancedManyToManyObjectRelation extends DynamicTypeObjectDataAbstract {
  id: string = 'advancedManyToManyObjectRelation'
  inheritedMaskOverlay: InheritanceOverlayType = 'form-item-container'

  getObjectDataComponent (props: AdvancedManyToManyObjectRelationObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <AdvancedManyToManyObjectRelation
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  getObjectDataFormItemProps (props: AdvancedManyToManyObjectRelationObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <ManyToManyRelationLabel
        label={ props.title }
        name={ props.name }
             />
    }
  }
}
