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
import { type AbstractObjectDataDefinition } from '../dynamic-type-object-data-abstract'
import {
  NumericRange,
  type NumericRangeProps,
  validateSecondValueGreater
} from '@Pimcore/components/numeric-range/numeric-range'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  type AbstractNumericObjectDataDefinition,
  DynamicTypeObjectDataAbstractNumeric
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-numeric'
import { toCssDimension } from '@Pimcore/utils/css'
import classNames from 'classnames'

export class DynamicTypeObjectDataNumericRange extends DynamicTypeObjectDataAbstractNumeric {
  id: string = 'numericRange'

  getObjectDataComponent (props: AbstractNumericObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const componentProps = this.getObjectDataComponentProps(props) as NumericRangeProps

    return (
      <NumericRange
        { ...componentProps }
        className={ classNames('w-full', props.className) }
        inputClassName="w-full"
        width={ toCssDimension(props.width, props.defaultFieldWidth.small * 2 + 8) }
      />
    )
  }

  getVersionObjectDataComponent (props: AbstractNumericObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    const componentProps = this.getVersionObjectDataComponentProps(props) as NumericRangeProps

    return (
      <NumericRange
        { ...componentProps }
        className={ classNames('w-full', props.className) }
        inputClassName="w-full"
        width={ toCssDimension(props.width, props.defaultFieldWidth.small * 2 + 8) }
      />
    )
  }

  getObjectDataFormItemProps (props: AbstractNumericObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      rules: [
        {
          validator: validateSecondValueGreater
        }
      ]
    }
  }
}
