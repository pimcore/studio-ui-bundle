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
import { FieldDefinitionEncryptedFieldFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/encryptedField/field-definition-encrypted-field-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionEncryptedField extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'encryptedField'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'encrypted' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'other']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      delegateDatatype: 'input'
    }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return ['encryptedFieldSupport']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionEncryptedFieldFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
