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
import { DynamicTypeFieldDefinitionDataAbstract, type FieldDefinitionData } from '@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract'
import { FieldDefinitionBooleanSelectFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/booleanSelect/field-definition-boolean-select-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionBooleanSelect extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'booleanSelect'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'boolean-select' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'select']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      yesLabel: 'yes',
      noLabel: 'no',
      emptyLabel: 'empty'
    }
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <>
        {super.getFormFields({ ...context, hideUnique: true, disableMandatory: true })}
        <FieldDefinitionBooleanSelectFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
