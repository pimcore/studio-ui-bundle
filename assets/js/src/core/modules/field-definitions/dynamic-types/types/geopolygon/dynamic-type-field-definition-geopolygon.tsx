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
import { FieldDefinitionGeopolygonFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/geopolygon/field-definition-geopolygon-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionGeopolygon extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'geopolygon'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'geographical-polygon' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'geo']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <>
        {super.getFormFields(context)}
        <FieldDefinitionGeopolygonFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
