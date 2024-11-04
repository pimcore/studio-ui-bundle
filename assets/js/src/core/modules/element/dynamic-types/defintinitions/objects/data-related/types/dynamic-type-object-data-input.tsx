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
import { Input } from 'antd'
import { type FormItemProps } from 'antd/es/form/FormItem'

export type InputObjectDataDefinition = AbstractObjectDataDefinition & {
  defaultValue: string | null
  showCharCount: boolean
  columnLength: number
  regex: string | null
  regexFlags: string[] | null
}

export class DynamicTypeObjectDataInput extends DynamicTypeObjectDataAbstract {
  id: string = 'input'
  getObjectDataComponent (props: InputObjectDataDefinition): React.ReactElement<AbstractObjectDataDefinition> {
    return (
      <Input
        disabled={ props.noteditable === true }
        maxLength={ props.columnLength }
        showCount={ props.showCharCount }
      />
    )
  }

  getObjectDataFormItemProps (props: InputObjectDataDefinition): FormItemProps {
    return {
      ...super.getObjectDataFormItemProps(props),
      initialValue: props.defaultValue,
      rules: [
        {
          pattern: typeof props.regex === 'string' && props.regex.length > 0 ? new RegExp(props.regex, props.regexFlags?.join('')) : undefined
        }
      ]
    }
  }
}
