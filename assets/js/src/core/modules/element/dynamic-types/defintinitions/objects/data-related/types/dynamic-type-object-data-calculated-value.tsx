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
  CalculatedValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/calculated-value/calculated-value'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  type ManyToManyRelationObjectDataDefinition
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/dynamic-type-object-data-many-to-many-relation'
import {
  CalculatedValueLabel
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/calculated-value/components/label/label'

export type CalculatedValueObjectDataDefinition = AbstractObjectDataDefinition & {
  elementType: string
  width?: number | string | null
}

export class DynamicTypeObjectDataCalculatedValue extends DynamicTypeObjectDataAbstract {
  id: string = 'calculatedValue'

  getObjectDataComponent (props: CalculatedValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <CalculatedValue
        { ...props }
        className={ props.className }
      />
    )
  }

  getObjectDataFormItemProps (props: ManyToManyRelationObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      label: <CalculatedValueLabel label={ props.title } />
    }
  }
}
