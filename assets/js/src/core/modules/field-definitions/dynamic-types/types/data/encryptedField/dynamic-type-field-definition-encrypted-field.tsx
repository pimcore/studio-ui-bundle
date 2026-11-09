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
import { FieldDefinitionEncryptedFieldFormFields } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/encryptedField/field-definition-encrypted-field-form-fields'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import React from 'react'

/**
 * The members that belong to the encrypted field itself rather than to the delegate it wraps.
 * They are neither hoisted out of a stored delegate nor cleared when the delegate type changes.
 *
 * `indexed` is in here because it is the Classification Store key's own search index flag, held on
 * the key and not on whatever type renders its value: left out, switching the delegate type would
 * clear it, the save would omit it, and an excluded key would reopen as indexed.
 */
export const BASE_FIELD_KEYS = new Set(['fieldtype', 'fieldType', 'datatype', 'name', 'title', 'tooltip', 'indexed'])

export class DynamicTypeFieldDefinitionEncryptedField extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'encryptedField'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'encrypted' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'other']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'classificationStore']
  }

  getDefaultData (): FieldDefinitionData {
    return {
      ...super.getDefaultData(),
      delegateDatatype: 'input'
    }
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return ['encryptedFieldSupport']
  }

  normalizeFieldDefinition (fieldDef: Record<string, unknown>): Record<string, unknown> {
    const hoisted = { ...fieldDef }

    if (
      hoisted.delegate !== null &&
      typeof hoisted.delegate === 'object' &&
      !Array.isArray(hoisted.delegate)
    ) {
      for (const [key, value] of Object.entries(hoisted.delegate as Record<string, unknown>)) {
        if (!BASE_FIELD_KEYS.has(key) && hoisted[key] === undefined) {
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
      <FieldDefinitionEncryptedFieldFormFields
        context={ context }
        id={ fieldDefinition?.name ?? id }
        type={ this.id }
      />
    )
  }
}
