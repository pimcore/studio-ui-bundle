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
import { DynamicTypeFieldDefinitionLayoutAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/_abstracts/dynamic-type-field-defintion-layout-abstract'
import { FieldDefinitionTextFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/text/field-definition-text-form-fields'
import { type ElementIcon } from '@sdk/components'
import React from 'react'

export class DynamicTypeFieldDefinitionText extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'text'

  getGroup (): string[] {
    return [...super.getGroup(), 'text']
  }

  getIcon (): ElementIcon {
    return { type: 'name', value: 'text-field' }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getDropdownTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionTextFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
