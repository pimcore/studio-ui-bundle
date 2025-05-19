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
  type AbstractObjectDataDefinition, DynamicTypeObjectDataAbstract
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import {
  Checkbox
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/checkbox/checkbox'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'
import { type ColumnMeta } from '@tanstack/react-table'
import { DEFAULT_CHECKBOX_COLUMN_WIDTH } from '../../../grid-cell/types/checkbox/dynamic-type-grid-cell-checkbox'

export type CheckboxObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue: boolean | number | null
}

export class DynamicTypeObjectDataCheckbox extends DynamicTypeObjectDataAbstract {
  id: string = 'checkbox'
  getObjectDataComponent (props: CheckboxObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Checkbox
        className={ props.className }
        disabled={ props.noteditable === true }
        inherited={ props.inherited }
        value={ props.value }
      />
    )
  }

  handleDefaultValue (props: CheckboxObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (typeof props.defaultValue !== 'boolean' && typeof props.defaultValue !== 'number') {
      return
    }

    if (typeof form.getFieldValue(fieldName) !== 'boolean') {
      form.setFieldValue(fieldName, Boolean(props.defaultValue))
    }
  }

  getDefaultGridColumnWidth (props?: ColumnMeta<any, any>): number | undefined {
    return DEFAULT_CHECKBOX_COLUMN_WIDTH
  }
}
