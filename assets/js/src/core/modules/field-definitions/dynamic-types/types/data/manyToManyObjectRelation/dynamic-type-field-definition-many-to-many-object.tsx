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
import { DynamicTypeFieldDefinitionDataAbstract, type FieldDefinitionData } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract'
import { FieldDefinitionManyToManyObjectRelationFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/manyToManyObjectRelation/field-definition-many-to-many-object-relation-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionManyToManyObject extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'manyToManyObjectRelation'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'many-to-many-object-relation' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'relation']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      width: '',
      height: '',
      maxItems: null,
      pathFormatterClass: '',
      classes: [],
      visibleFields: '',
      displayMode: 'grid',
      enableTextSelection: false,
      allowToCreateNewObject: false,
      allowToClearRelation: false,
      optimizedAdminLoading: false
    }
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionManyToManyObjectRelationFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true, disableIndex: true })
  }
}
