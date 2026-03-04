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
import { FieldDefinitionObjectbricksFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/objectbricks/field-definition-objectbricks-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionObjectbricks extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'objectbricks'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'object-bricks' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'structured']
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionObjectbricksFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({
      ...context,
      hideUnique: true,
      disableMandatory: true,
      disableIndex: true,
      disableVisibleGridView: true,
      disableVisibleSearch: true
    })
  }
}
