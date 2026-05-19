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
import { FieldDefinitionIframeFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/iframe/field-definition-iframe-form-fields'
import { type ElementIcon } from '@sdk/components'
import React from 'react'

export class DynamicTypeFieldDefinitionIframe extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'iframe'

  getGroup (): string[] {
    return [...super.getGroup(), 'iframe']
  }

  getIcon (): ElementIcon {
    return { type: 'name', value: 'preview' }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getDropdownTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideRegion: true, hideCollapsible: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionIframeFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
