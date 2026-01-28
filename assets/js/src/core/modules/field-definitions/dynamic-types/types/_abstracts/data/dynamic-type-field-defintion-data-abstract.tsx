/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DynamicTypeFieldDefinitionAbstract, type FieldDefinitionDataAbstract, type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { FieldDefinitionDataFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/data/field-defintion-data-form-fields'
import React from 'react'

export interface FieldDefinitionData extends FieldDefinitionDataAbstract {
  name: string
  title: string
  tooltip: string
}

export abstract class DynamicTypeFieldDefinitionDataAbstract extends DynamicTypeFieldDefinitionAbstract {
  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'group:data']
  }

  getConvertibleTags (props: FieldDefinitionContext): string[] {
    return ['group:data']
  }

  getDropdownTags (props: FieldDefinitionContext): string[] {
    const isCustomLayout = props.area.includes('custom-layout')

    if (isCustomLayout) {
      return []
    }

    return this.getAllowedChildTags(props)
  }

  getGroup (): string[] {
    return ['data']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      fieldtype: this.id,
      datatype: 'data',
      name: '',
      title: '',
      tooltip: 'Some predefined tooltip'
    }
  }

  isValid (data: FieldDefinitionData): boolean {
    return data.name.trim().length > 0
  }

  getId (context: FieldDefinitionContext): string {
    return context.path.at(-1) ?? ''
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionDataFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
