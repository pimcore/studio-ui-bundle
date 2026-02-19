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
import { FieldDefinitionFieldcollectionsFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/fieldcollections/field-definition-fieldcollections-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionFieldcollections extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'fieldcollections'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'field-collection-field' }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getAllowedChildTags(props), 'group:layout', 'group:data']
  }

  getDisallowedRecursiveChildTags (props: FieldDefinitionContext): string[] {
    return [...super.getDisallowedRecursiveChildTags(props), 'fieldcollections']
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'structured']
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]
    const enrichedContext = {
      ...context,
      hideUnique: true,
      disableMandatory: true,
      disableIndex: true,
      disableVisibleGridView: true,
      disableVisibleSearch: true
    }
    return (
      <>
        {super.getFormFields(enrichedContext)}
        <FieldDefinitionFieldcollectionsFormFields
          context={ context }
          id={ fieldDefinition?.name ?? id }
          type={ this.id }
        />
      </>
    )
  }
}
