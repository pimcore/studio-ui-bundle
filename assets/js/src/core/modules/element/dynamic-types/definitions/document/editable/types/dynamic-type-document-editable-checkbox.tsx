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
import { CheckboxEditable } from '../components/checkbox-editable/checkbox-editable'

export type CheckboxEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: {
    label?: string
    class?: string
    reload?: boolean
  }
}

export class DynamicTypeDocumentEditableCheckbox extends DynamicTypeDocumentEditableAbstract {
  id: string = 'checkbox'

  getEditableDataComponent (props: CheckboxEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <CheckboxEditable
        className={ props.config?.class }
        config={ props.config }
        inherited={ props.inherited }
        name={ props.name }
        value={ props.value }
      />
    )
  }

  transformValue (value: any): boolean {
    return Boolean(value)
  }
}
