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
  Checkbox
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/checkbox/checkbox'
import type { FormInstance } from 'antd'
import type { NamePath } from 'rc-field-form/es/interface'

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
}
