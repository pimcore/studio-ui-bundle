/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo, useCallback } from 'react'
import { Alert } from '@sdk/components'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { isNil, isEqual } from 'lodash'
import { defaultFieldWidthValues, FieldWidthProvider } from '@sdk/modules/element'
import { useDocumentEditor } from '../../hooks/use-document-editor'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { RequiredFieldWrapper, applyRequiredStyling, removeRequiredStyling } from './required-field-wrapper'

interface RenderEditableProps {
  editableDefinition: AbstractDocumentEditableDefinition
  containerRef: React.RefObject<HTMLDivElement>
}

export const EDITABLE_DEFAULT_FIELD_WIDTHS = {
  ...defaultFieldWidthValues,
  large: 9999
}

export const RenderEditable = ({ editableDefinition, containerRef }: RenderEditableProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const editableType = documentEditableRegistry.hasDynamicType(editableDefinition.type) ? documentEditableRegistry.getDynamicType(editableDefinition.type) : undefined
  const { updateValue, updateValueWithReload, getValue, getInheritanceState, setInheritanceState } = useDocumentEditor()
  const isInherited = getInheritanceState(editableDefinition.name)
  const [localValue, setLocalValue] = useState(getValue(editableDefinition.name).data)
  const [, forceUpdate] = useState({})

  const handleOverwrite = (): void => {
    setInheritanceState(editableDefinition.name, false)
    forceUpdate({})
  }

  const isRequired = Boolean(editableDefinition.config?.required)

  const editableProps: AbstractDocumentEditableDefinition = useMemo(() => ({
    ...editableDefinition,
    inherited: isInherited,
    defaultFieldWidth: EDITABLE_DEFAULT_FIELD_WIDTHS,
    containerRef
  }), [editableDefinition, isInherited, containerRef])

  const handleChange = useCallback((newValue: any) => {
    const oldValue = localValue
    setLocalValue(newValue)

    if (isRequired) {
      const isEmpty = editableType?.isEmpty(newValue, editableDefinition) ?? true
      if (isEmpty) {
        applyRequiredStyling(editableDefinition.name, document)
      } else {
        removeRequiredStyling(editableDefinition.name, document)
      }
    }

    if (isInherited) {
      handleOverwrite()
    }

    const shouldReload = !isEqual(oldValue, newValue) && editableType?.reloadOnChange(editableProps, oldValue, newValue)

    if (shouldReload) {
      updateValueWithReload(editableDefinition.name, { type: editableDefinition.type, data: newValue })
    } else {
      updateValue(editableDefinition.name, { type: editableDefinition.type, data: newValue })
    }
  }, [isRequired, isInherited])

  const renderEditableComponent = useMemo((): React.ReactElement => {
    if (isNil(editableType)) {
      return <></>
    }

    return React.cloneElement(
      editableType.getEditableDataComponent(editableProps),
      {
        key: editableDefinition.name,
        value: localValue,
        onChange: handleChange
      }
    )
  }, [editableType, editableProps, localValue, isInherited, handleChange])

  if (isNil(editableType)) {
    return (
      <Alert
        message={ (<>Editable type &quot;{editableDefinition.type}&quot; not found:<p>{JSON.stringify(editableDefinition)}</p></>) }
        type="warning"
      />
    )
  }

  return (
    <ErrorBoundary>
      <FieldWidthProvider fieldWidthValues={ { large: 9999 } }>
        <RequiredFieldWrapper
          editableName={ editableDefinition.name }
          isRequired={ isRequired }
        >
          { renderEditableComponent }
        </RequiredFieldWrapper>
      </FieldWidthProvider>
    </ErrorBoundary>
  )
}
