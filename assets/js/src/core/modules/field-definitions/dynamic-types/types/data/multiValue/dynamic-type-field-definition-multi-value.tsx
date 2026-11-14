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
import { MULTI_VALUE_OWN_KEYS } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/multi-value-own-keys'
import { FieldDefinitionMultiValueFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/multiValue/field-definition-multi-value-form-fields'
import { CLASSIFICATION_STORE_KEY_TYPE_TAG } from '@Pimcore/modules/field-definitions/dynamic-types/utils/classification-store-key-types'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

export class DynamicTypeFieldDefinitionMultiValue extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'multiValue'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'list' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'other']
  }

  // A Classification Store key type only: outside that area it carries no `group:data`, which is what the class editor's field dropdown is built from.
  getTags (props: FieldDefinitionContext): string[] {
    if (props.area.includes('classification-store')) {
      return [...super.getTags(props), CLASSIFICATION_STORE_KEY_TYPE_TAG]
    }

    return super.getTags(props).filter((tag) => tag !== 'group:data')
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      delegateDatatype: null,
      variants: [],
      multiValue: false,
      maximum: null,
      unqualifiedValue: true
    }
  }

  normalizeFieldDefinition (fieldDef: Record<string, unknown>): Record<string, unknown> {
    const hoisted = { ...fieldDef }

    if (
      hoisted.delegate !== null &&
      typeof hoisted.delegate === 'object' &&
      !Array.isArray(hoisted.delegate)
    ) {
      for (const [key, value] of Object.entries(hoisted.delegate as Record<string, unknown>)) {
        if (!MULTI_VALUE_OWN_KEYS.has(key) && hoisted[key] === undefined) {
          hoisted[key] = value
        }
      }
    }

    return hoisted
  }

  getFormFields (context: FieldDefinitionContext): React.JSX.Element {
    return super.getFormFields({ ...context, hideUnique: true })
  }

  getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element {
    const id = this.getId(context)
    const fieldDefinition = context.fieldDefinitions[id]

    return (
      <FieldDefinitionMultiValueFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
