/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { type ILayoutContext } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { DynamicTypeAbstract } from '@sdk/modules/element'
import { type ElementIcon } from '@sdk/modules/widget-manager'
import { container, serviceIds } from '@sdk/app'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'

export interface FieldDefinitionDataAbstract extends Record<string, any> {
  fieldtype: string
}

export interface FieldDefinitionContext extends Record<string, any> {
  area: string[]
  path: string[]
  fieldDefinitions: ILayoutContext['fieldDefinitions']
  disableName?: boolean
  isEncryptedField?: boolean
}

export interface FieldDefinitionConvertibleContext extends FieldDefinitionContext {
  newTypeId: string
}

export interface FieldDefinitionAbstractFormFieldsProps {
  context: FieldDefinitionContext
  id: string
  type: string
}

export abstract class DynamicTypeFieldDefinitionAbstract extends DynamicTypeAbstract {
  abstract getGroup (): string[]

  getIcon (): ElementIcon {
    return { type: 'name', value: 'questionmark' }
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [this.id]
  }

  getAllowedChildTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getDisallowedRecursiveChildTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getConvertibleTags (props: FieldDefinitionContext): string[] {
    return []
  }

  getDropdownTags (props: FieldDefinitionContext): string[] {
    const isCustomLayout = props.area.includes('custom-layout')

    if (isCustomLayout) {
      return ['group:layout']
    }

    return this.getAllowedChildTags(props)
  }

  getValidChildTags (props: FieldDefinitionContext): string[] {
    const allowedChildTags = this.getAllowedChildTags(props)
    const validChildTags = this.computeValidTags(allowedChildTags, props)
    return validChildTags
  }

  getValidConvertibleTags (props: FieldDefinitionContext): string[] {
    const convertibleTags = this.getConvertibleTags(props)
    const validConvertibleTags = this.computeValidTags(convertibleTags, props).filter(tag => tag !== this.id)
    return validConvertibleTags
  }

  getValidDropdownTags (props: FieldDefinitionContext): string[] {
    const dropdownTags = this.getDropdownTags(props)
    const validDropdownTags = this.computeValidTags(dropdownTags, props)
    return validDropdownTags
  }

  isValid (data: FieldDefinitionDataAbstract, context: FieldDefinitionContext): boolean {
    return true
  }

  opensNamespace (): boolean {
    return false
  }

  abstract getDefaultData (context: FieldDefinitionContext): FieldDefinitionDataAbstract

  getConvertibleData (context: FieldDefinitionConvertibleContext): Partial<FieldDefinitionDataAbstract> {
    return {}
  }

  abstract getFormFields (context: FieldDefinitionContext): React.JSX.Element

  abstract getSpecificFormFields (context: FieldDefinitionContext): React.JSX.Element

  getAdditionalFormFields (context: FieldDefinitionContext): React.JSX.Element | null {
    return null
  }

  normalizeFieldDefinition (fieldDef: Record<string, unknown>): Record<string, unknown> {
    return fieldDef
  }

  protected computeValidTags (tags: string[], context: FieldDefinitionContext): string[] {
    const { path, fieldDefinitions } = context
    const usedFieldDefinitions = path.map((pathItem) => fieldDefinitions[pathItem])
    const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

    const blockedTags: string[] = []
    usedFieldDefinitions.forEach((usedFieldDefinition) => {
      if (usedFieldDefinition !== undefined) {
        const disallowedTags = fieldDefinitionRegistry.getDynamicType(usedFieldDefinition.fieldtype, false)?.getDisallowedRecursiveChildTags({
          ...context
        }) ?? []

        blockedTags.push(...disallowedTags)
      }
    })

    const allowedChildTags = tags
    const resolvedBlockedTags = fieldDefinitionRegistry.getTypesByTags(blockedTags, context).map(type => type.id)
    const resolvedAllowedChildTags = fieldDefinitionRegistry.getTypesByTags(allowedChildTags, context).map(type => type.id)
    const validChildTags = resolvedAllowedChildTags.filter(tag => !resolvedBlockedTags.includes(tag))

    return validChildTags
  }
}
