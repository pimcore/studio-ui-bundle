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
import { FieldDefinitionTimeFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/time/field-definition-time-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionTime extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'time'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'time' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'date']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'encryptedFieldSupport', 'classificationStore']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      width: '',
      increment: 15,
      minValue: null,
      maxValue: null
    }
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionTimeFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
