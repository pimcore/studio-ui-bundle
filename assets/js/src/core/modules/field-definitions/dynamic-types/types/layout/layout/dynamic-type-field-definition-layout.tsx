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
import { FieldDefinitionLayoutTypeFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/layout/layout/field-definition-layout-form-fields'
import { type ElementIcon } from '@sdk/components'
import React from 'react'

export class DynamicTypeFieldDefinitionLayout extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'layout'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'panel' }
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'group:root']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = context.path.at(-1) ?? ''
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <>
        {super.getFormFields(context)}
        <FieldDefinitionLayoutTypeFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
