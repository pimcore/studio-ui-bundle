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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract } from '../dynamic-type-object-data-abstract'
import {
  InputQuantityValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/input-quantity-value/input-quantity-value'
import type { FormItemProps } from 'antd/es/form/FormItem'

export type InputQuantityValueObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultUnit: string | null
  defaultValue: string | null
  validUnits: string[] | null
  width: string | null
}

export class DynamicTypeObjectDataInputQuantityValue extends DynamicTypeObjectDataAbstract {
  id: string = 'inputQuantityValue'

  getObjectDataComponent (props: InputQuantityValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <InputQuantityValue
        { ...props }
        disabled={ props.noteditable === true }
      />
    )
  }

  getObjectDataFormItemProps (props: InputQuantityValueObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: {
        value: props.defaultValue,
        unitId: props.defaultUnit
      }
    }
  }
}
