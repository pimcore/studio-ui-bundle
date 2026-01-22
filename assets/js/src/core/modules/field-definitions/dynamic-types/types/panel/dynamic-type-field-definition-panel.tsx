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
import { DynamicTypeFieldDefinitionLayoutAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/_abstracts/layout/dynamic-type-field-defintion-layout-abstract'
import { FieldDefinitionPanelFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/panel/field-definition-panel-form-fields'
import React from 'react'

export class DynamicTypeFieldDefinitionPanel extends DynamicTypeFieldDefinitionLayoutAbstract {
  id: string = 'panel'

  getGroup (): string[] {
    return [...super.getGroup(), 'panel']
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
        <FieldDefinitionPanelFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
