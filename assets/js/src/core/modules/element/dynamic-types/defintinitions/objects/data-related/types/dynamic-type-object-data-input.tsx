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

import { type AbstractObjectDataDefinition } from '../dynamic-type-object-data-abstract'
import { type FormItemProps } from 'antd/es/form/FormItem'

import {
  DynamicTypeObjectDataAbstractInput, type InputProps
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/types/abstract/dynamic-type-object-data-abstract-input'
import { type FormInstance } from 'antd'
import { type NamePath } from 'rc-field-form/es/interface'
import _ from 'lodash'

export type InputObjectDataDefinition = AbstractObjectDataDefinition & InputProps & {
  defaultValue: string | null
  regex: string | null
  regexFlags: string[] | null
}

export class DynamicTypeObjectDataInput extends DynamicTypeObjectDataAbstractInput {
  id: string = 'input'

  getObjectDataFormItemProps (props: InputObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      rules: [
        {
          pattern: typeof props.regex === 'string' && props.regex.length > 0 ? new RegExp(props.regex, props.regexFlags?.join('')) : undefined
        }
      ]
    }
  }

  handleDefaultValue (props: InputObjectDataDefinition, form: FormInstance, fieldName: NamePath): void {
    if (_.isEmpty(props.defaultValue)) {
      return
    }
    if (_.isEmpty(form.getFieldValue(fieldName))) {
      form.setFieldValue(fieldName, props.defaultValue)
    }
  }
}
