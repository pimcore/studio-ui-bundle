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
import { isNil } from 'lodash'
import { type SelectOptionType } from '@sdk/modules/element'
import i18n from '@Pimcore/app/i18n'
import { MultiSelectEditable } from '../components/multiselect-editable/multiselect-editable'

export type MultiSelectEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    store: Array<[string | number | null, string]>
    width?: number
    class?: string
  }
}
export class DynamicTypeDocumentEditableMultiSelect extends DynamicTypeDocumentEditableAbstract {
  id: string = 'multiselect'

  getEditableDataComponent (props: MultiSelectEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    const options: SelectOptionType[] = props.config?.store?.map(([value, label]) => ({
      value,
      label: i18n.t(label)
    })) ?? []

    return (
      <MultiSelectEditable
        className={ props.config?.class }
        inherited={ props.inherited }
        onChange={ props.onChange }
        options={ options }
        value={ props.value }
        width={ props.config?.width }
      />
    )
  }

  transformValue (value: any, props: MultiSelectEditableDefinition): any {
    if (isNil(value)) {
      return null
    }
    return value
  }
}
