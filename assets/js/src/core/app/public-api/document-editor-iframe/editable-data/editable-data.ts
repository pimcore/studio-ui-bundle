/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { isNil } from 'lodash'

export interface ValueType { type: string, data: any }

export interface DocumentEditableApi {
  getValues: (forApi?: boolean) => Record<string, ValueType>
  getValue: (key: string) => ValueType
  updateValue: (key: string, value: ValueType) => void
  initializeValues: (initialValues: Record<string, ValueType>) => void
}

class DocumentEditableApiImpl implements DocumentEditableApi {
  private values: Record<string, ValueType> = {}

  getValues (forApi: boolean = false): Record<string, ValueType> {
    if (!forApi) {
      return { ...this.values }
    }

    try {
      const transformedValues: Record<string, ValueType> = {}

      for (const [editableName, editableValue] of Object.entries(this.values)) {
        const transformedValue = this.transformEditableValue(editableName, editableValue)
        transformedValues[editableName] = transformedValue
      }

      return transformedValues
    } catch (error) {
      console.warn('Could not apply transformValueForApi transformations:', error)
      return { ...this.values }
    }
  }

  getValue (key: string): ValueType {
    return this.values[key]
  }

  updateValue (key: string, value: ValueType): void {
    this.values[key] = value
  }

  initializeValues (initialValues: Record<string, ValueType>): void {
    Object.assign(this.values, initialValues)
  }

  private getEditableDefinitions (): AbstractDocumentEditableDefinition[] {
    try {
      const iframeWindow = window as any
      return iframeWindow.editableDefinitions ?? []
    } catch (error) {
      console.warn('Could not get editable definitions from iframe window:', error)
      return []
    }
  }

  private transformEditableValue (editableName: string, editableValue: ValueType): ValueType {
    const editableDefinitions = this.getEditableDefinitions()
    const editableDefinition = editableDefinitions.find(def => def.name === editableName)

    if (isNil(editableDefinition)) {
      return editableValue
    }

    const dynamicType = this.getDynamicTypeForEditable(editableDefinition.type)

    if (isNil(dynamicType)) {
      return editableValue
    }

    const apiValue = dynamicType.transformValueForApi(editableValue.data, editableDefinition)

    return {
      type: editableValue.type,
      data: apiValue
    }
  }

  private getDynamicTypeForEditable (editableType: string): any {
    try {
      const documentEditableRegistry = container.get<DynamicTypeDocumentEditableRegistry>(
        serviceIds['DynamicTypes/DocumentEditableRegistry']
      )

      if (!documentEditableRegistry.hasDynamicType(editableType)) {
        return null
      }

      return documentEditableRegistry.getDynamicType(editableType)
    } catch (error) {
      console.warn(`Could not get dynamic type for editable type "${editableType}":`, error)
      return null
    }
  }
}

export const documentEditableApi = new DocumentEditableApiImpl()
