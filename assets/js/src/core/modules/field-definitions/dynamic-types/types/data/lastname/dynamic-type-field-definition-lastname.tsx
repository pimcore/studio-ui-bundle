/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { DynamicTypeFieldDefinitionDataAbstract, type FieldDefinitionData } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract'
import { FieldDefinitionLastnameFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/lastname/field-definition-lastname-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import { t } from 'i18next'
import React from 'react'

export class DynamicTypeFieldDefinitionLastname extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'lastname'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'name' }
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      name: 'lastname',
      title: t('field-definition.crm.lastname.title')
    }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'crm']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'encryptedFieldSupport']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true, disableName: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionLastnameFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }

  normalizeFieldDefinition (fieldDef: Record<string, unknown>): Record<string, unknown> {
    const normalized = super.normalizeFieldDefinition(fieldDef)
    if (typeof normalized.title !== 'string' || normalized.title === '') {
      normalized.title = t('field-definition.crm.lastname.title')
    }
    return normalized
  }
}
