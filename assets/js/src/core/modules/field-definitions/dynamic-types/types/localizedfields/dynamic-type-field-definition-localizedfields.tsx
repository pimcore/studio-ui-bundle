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
import { FieldDefinitionLocalizedfieldsFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/localizedfields/field-definition-localizedfields-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionLocalizedfields extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'localizedfields'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'field-container' }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data']
  }

  getDisallowedRecursiveChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getDisallowedRecursiveChildTags(props), 'localizedfields']
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'structured']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      name: 'localizedfields'
    }
  }

  isValid (): boolean {
    // name is always valid since it's hardcoded
    return true
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionLocalizedfieldsFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
