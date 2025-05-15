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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps } from '../dynamic-type-object-data-abstract'

import {
  QuantityValue,
  type QuantityValueValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/quantity-value/quantity-value'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import { isEmpty } from 'lodash'
import { QuantityValue as QuantityValuePreview } from '../../grid-cell-preview/quantity-value/quantity-value'

export type QuantityValueObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultUnit: string | null
  defaultValue: number | null
  validUnits: string[] | null
  unitWidth: string | null
  decimalPrecision: number | null
  width: string | null
  autoConvert: boolean
}

export class DynamicTypeObjectDataQuantityValue extends DynamicTypeObjectDataAbstract {
  id: string = 'quantityValue'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: QuantityValueObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <QuantityValue
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  handleDefaultValue (props: QuantityValueObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (isEmpty(props.defaultValue) && isEmpty(props.defaultUnit)) {
      return
    }
    if (isEmpty(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, {
        value: props.defaultValue,
        unitId: props.defaultUnit
      })
    }
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: QuantityValueValue | null = props.cellProps.getValue()

    return isEmpty(value)
      ? <></>
      : (
        <QuantityValuePreview
          unitId={ value.unitId }
          value={ value.value }
        />
        )
  }
}
