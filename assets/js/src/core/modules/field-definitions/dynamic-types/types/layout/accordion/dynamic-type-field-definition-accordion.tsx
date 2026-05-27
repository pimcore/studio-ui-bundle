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
import { DynamicTypeFieldDefinitionLayoutAbstract, type FieldDefinitionLayout } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/_abstracts/dynamic-type-field-defintion-layout-abstract'
import { FieldDefinitionAccordionFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/accordion/field-definition-accordion-form-fields'
import { type ElementIcon } from '@sdk/components'
import React from 'react'

export interface FieldDefinitionAccordion extends FieldDefinitionLayout {
  border: boolean
  width: string
  height: string
}

export class DynamicTypeFieldDefinitionAccordion extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'accordion'

  getGroup (): string[] {
    return [...super.getGroup(), 'accordion']
  }

  getIcon (): ElementIcon {
    return { type: 'name', value: 'accordion' }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return ['panel', 'region', 'tabpanel', 'text', 'iframe']
  }

  getDropdownTags (props: FieldDefinitionContext): string[] {
    return this.getAllowedChildTags(props)
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionAccordionFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
