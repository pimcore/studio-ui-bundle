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
import { FieldDefinitionInputFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/input/field-defintion-input-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionInput extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'input'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'text-field' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'text']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return (
      <>
        {super.getFormFields(context)}
        <FieldDefinitionInputFormFields context={ context } />
      </>
    )
  }
}
