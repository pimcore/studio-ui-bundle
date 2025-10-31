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
import { useMemo } from 'react'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { type DynamicTypeObjectDataAbstract, type AbstractObjectDataDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-abstract'
import { defaultFieldWidthValues } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'

interface WorkflowAdditionalField {
  name: string
  fieldType: string
  title: string
  required?: boolean
  fieldTypeSettings?: Record<string, any>
}

type SupportedFieldType = 'input' | 'numeric' | 'textarea' | 'select' | 'datetime' | 'date' | 'user' | 'checkbox'

interface WorkflowFieldDefinition {
  name: string
  title: string
  required: boolean
  fieldType: string
  component: React.ReactElement
}

interface UseWorkflowFieldRendererReturn {
  renderFields: (additionalFields?: WorkflowAdditionalField[]) => WorkflowFieldDefinition[]
  getSupportedFieldTypes: () => SupportedFieldType[]
}

export const useWorkflowFieldRenderer = (): UseWorkflowFieldRendererReturn => {
  const objectDataRegistry = useMemo(() => {
    return container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])
  }, [])

  const supportedFieldTypes: SupportedFieldType[] = ['input', 'numeric', 'textarea', 'select', 'datetime', 'date', 'user', 'checkbox']

  const getSupportedFieldTypes = (): SupportedFieldType[] => supportedFieldTypes

  const renderFields = (additionalFields: WorkflowAdditionalField[] = []): WorkflowFieldDefinition[] => {
    return additionalFields
      .filter((field) => supportedFieldTypes.includes(field.fieldType as SupportedFieldType))
      .map((field) => {
        const dynamicType = getDynamicTypeForField(field.fieldType)

        if (dynamicType === null) {
          return null
        }

        const fieldProps: AbstractObjectDataDefinition = {
          name: field.name,
          title: field.title,
          datatype: 'data',
          fieldType: field.fieldType,
          defaultFieldWidth: defaultFieldWidthValues,
          noteditable: false,
          inherited: false,
          value: undefined,
          ...field.fieldTypeSettings
        }

        const component = dynamicType.getObjectDataComponent(fieldProps)

        return {
          name: field.name,
          title: field.title,
          required: field.required ?? false,
          fieldType: field.fieldType,
          component
        }
      })
      .filter((field): field is WorkflowFieldDefinition => field !== null)
  }

  const getDynamicTypeForField = (fieldType: string): DynamicTypeObjectDataAbstract | null => {
    try {
      if (!objectDataRegistry.hasDynamicType(fieldType)) {
        console.warn(`Dynamic type "${fieldType}" not found in ObjectDataRegistry`)
        return null
      }

      return objectDataRegistry.getDynamicType(fieldType)
    } catch (error) {
      console.warn(`Could not get dynamic type for field type "${fieldType}":`, error)
      return null
    }
  }

  return {
    renderFields,
    getSupportedFieldTypes
  }
}
