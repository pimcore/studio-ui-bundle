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
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { Select } from '@sdk/components'
import { isEmpty, isNil } from 'lodash'
import { toCssDimension } from '@sdk/utils'
import { type SelectOptionType } from '@sdk/modules/element'
import i18n from '@Pimcore/app/i18n'

export type SelectEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    store: Array<[string | number | null, string]>
    width?: number
    class?: string
    defaultValue?: string
  }
}
export class DynamicTypeDocumentEditableSelect extends DynamicTypeDocumentEditableAbstract {
  id: string = 'select'

  getEditableDataComponent (props: SelectEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    const options: SelectOptionType[] = props.config?.store?.map(([value, label]) => ({
      value,
      label: i18n.t(label)
    })) ?? []

    return (
      <Select
        className={ props.config?.class }
        optionFilterProp="label"
        options={ options }
        showSearch
        style={ {
          width: '100%',
          maxWidth: toCssDimension(props.config?.width, props.defaultFieldWidth.medium)
        } }
      />
    )
  }

  transformValue (value: any, props: SelectEditableDefinition): any {
    if (isNil(value) || isEmpty(value)) {
      return props.config?.defaultValue ?? null
    }
    return value
  }
}
