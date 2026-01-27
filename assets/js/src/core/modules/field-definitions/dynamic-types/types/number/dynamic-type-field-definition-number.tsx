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
import { DynamicTypeFieldDefinitionDataAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/data/dynamic-type-field-defintion-data-abstract'
import { FieldDefinitionNumberFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/number/field-definition-number-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionNumber extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'numeric'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'number-field' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'numeric']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <>
        {super.getFormFields(context)}
        <FieldDefinitionNumberFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
