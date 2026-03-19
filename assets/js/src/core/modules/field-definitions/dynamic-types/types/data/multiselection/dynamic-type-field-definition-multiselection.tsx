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
import { DynamicTypeFieldDefinitionDataAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract'
import { FieldDefinitionMultiselectionFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiselection/field-definition-multiselection-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionMultiselection extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'multiselect'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'multi-select' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'select']
  }

  getDefaultData (): any {
    return {
      ...super.getDefaultData(),
      renderType: 'list',
      optionsProviderType: 'configure'
    }
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'group:select', 'encryptedFieldSupport', 'classificationStore']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true, disableIndex: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionMultiselectionFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
