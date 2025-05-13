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
import { type GetGridCellDefinitionProps, type AbstractObjectDataDefinition, type EditMode } from '../dynamic-type-object-data-abstract'
import {
  NumericRange,
  type NumericRangeProps,
  type NumericRangeValue,
  validateSecondValueGreater
} from '@Pimcore/components/numeric-range/numeric-range'
import type { FormItemProps } from 'antd/es/form/FormItem'
import {
  type AbstractNumericObjectDataDefinition,
  DynamicTypeObjectDataAbstractNumeric
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-numeric'
import { toCssDimension } from '@Pimcore/utils/css'
import classNames from 'classnames'
import { NumericRange as NumericRangePreview } from '../../grid-cell-preview/numeric-range/numeric-range'

export class DynamicTypeObjectDataNumericRange extends DynamicTypeObjectDataAbstractNumeric {
  id: string = 'numericRange'
  gridCellEditMode: EditMode = 'edit-modal'

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

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: NumericRangeValue | null = props.cellProps.getValue()

    return (
      <NumericRangePreview
        max={ value?.maximum ?? undefined }
        min={ value?.minimum ?? undefined }
      />
    )
  }
}
