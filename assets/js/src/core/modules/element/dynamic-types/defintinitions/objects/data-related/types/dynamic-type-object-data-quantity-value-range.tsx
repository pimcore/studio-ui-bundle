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

import { type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract, type EditMode, type GetGridCellDefinitionProps } from '../dynamic-type-object-data-abstract'

import {
  QuantityValueRange,
  type QuantityValueRangeValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/quantity-value-range/quantity-value-range'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import _, { isNull } from 'lodash'
import { QuantityValueRange as QuantityValueRangePreview } from '../../grid-cell-preview/quantity-value-range/quantity-value-range'

export type QuantityValueRangeObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultUnit: string | null
  validUnits: string[] | null
  unitWidth: string | null
  decimalPrecision: number | null
  width: string | null
}

export class DynamicTypeObjectDataQuantityValueRange extends DynamicTypeObjectDataAbstract {
  id: string = 'quantityValueRange'
  gridCellEditMode: EditMode = 'edit-modal'

  getObjectDataComponent (props: QuantityValueRangeObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <QuantityValueRange
        { ...props }
        className={ props.className }
        disabled={ props.noteditable === true }
      />
    )
  }

  handleDefaultValue (props: QuantityValueRangeObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (_.isEmpty(props.defaultUnit)) {
      return
    }
    if (_.isEmpty(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, {
        minimum: null,
        maximum: null,
        unitId: props.defaultUnit
      })
    }
  }

  getGridCellPreviewComponent (props: GetGridCellDefinitionProps): React.ReactElement {
    const value: QuantityValueRangeValue | null = props.cellProps.getValue()

    return isNull(value)
      ? <></>
      : (
        <QuantityValueRangePreview
          max={ value.maximum ?? undefined }
          min={ value.minimum ?? undefined }
          unitId={ value.unitId }
        />
        )
  }
}
