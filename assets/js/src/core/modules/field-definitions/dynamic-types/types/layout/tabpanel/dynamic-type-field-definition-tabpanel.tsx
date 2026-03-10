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
import { FieldDefinitionTabpanelFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/tabpanel/field-definition-tabpanel-form-fields'
import { type ElementIcon } from '@sdk/components'
import React from 'react'

export class DynamicTypeFieldDefinitionTabpanel extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'tabpanel'

  getGroup (): string[] {
    return [...super.getGroup(), 'tabpanel']
  }

  getIcon (): ElementIcon {
    return { type: 'name', value: 'tab-panel' }
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionTabpanelFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
