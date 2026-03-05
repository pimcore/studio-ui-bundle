/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  DynamicTypeFieldDefinitionAbstract, type FieldDefinitionDataAbstract, type FieldDefinitionContext
} from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { FieldDefinitionDataFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/field-defintion-data-form-fields'
import { FormKit } from '@sdk/components'
import React from 'react'
import { t } from 'i18next'

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
      tooltip: ''
    }
  }

  isValid (data: FieldDefinitionData): boolean {
    return data.name.trim().length > 0
  }

  getId (context: FieldDefinitionContext): string {
    return context.path.at(-1) ?? ''
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <>
        <FieldDefinitionDataFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
        {this.getCustomLayoutOptions(context)}
        {this.getSpecificSettingsPanel(context)}
      </>
    )
  }

  getSpecificSettingsPanel (context: FieldDefinitionContext): React.JSX.Element {
    return (
      <FormKit.Panel title={ t('specific-settings') }>
        {this.getSpecificFormFields(context)}
      </FormKit.Panel>
    )
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return <></>
  }

  getCustomLayoutOptions (context: FieldDefinitionContext): React.JSX.Element {
    return <></>
  }
}
