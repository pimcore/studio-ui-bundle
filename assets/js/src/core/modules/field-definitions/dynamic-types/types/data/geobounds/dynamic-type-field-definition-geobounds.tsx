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
import { FieldDefinitionGeoboundsFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/geobounds/field-definition-geobounds-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionGeobounds extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'geobounds'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'geographical-bounds' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'geo']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'encryptedFieldSupport']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      lat: 0,
      lng: 0,
      zoom: 1,
      width: '',
      height: 180
    }
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true, disableVisibleGridView: true, disableVisibleSearch: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionGeoboundsFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
