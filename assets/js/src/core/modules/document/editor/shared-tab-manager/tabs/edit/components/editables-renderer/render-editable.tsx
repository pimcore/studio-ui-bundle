/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo } from 'react'
import { Alert, Form } from '@sdk/components'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { isNil, isUndefined } from 'lodash'
import { defaultFieldWidthValues, FieldWidthProvider } from '@sdk/modules/element'
import { useDocumentEditor } from '../../hooks/use-document-editor'

interface RenderEditableProps {
  editableDefinition: AbstractDocumentEditableDefinition
  containerRef: React.RefObject<HTMLDivElement>
}

export const RenderEditable = ({ editableDefinition, containerRef }: RenderEditableProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const editableType = documentEditableRegistry.hasDynamicType(editableDefinition.type) ? documentEditableRegistry.getDynamicType(editableDefinition.type) : undefined
  const { updateValue, updateValueWithReload, getValue } = useDocumentEditor()
  const editableProps: AbstractDocumentEditableDefinition = {
    ...editableDefinition,
    defaultFieldWidth: {
      ...defaultFieldWidthValues,
      large: 9999
    },
    containerRef
  }

  const [localValue, setLocalValue] = useState(getValue(editableDefinition.name).data)

  const renderEditableComponent = useMemo((): React.ReactElement => {
    if (isNil(editableType)) {
      return <></>
    }

    const shouldReload = editableType.reloadOnChange(editableProps)

    return React.cloneElement(
      editableType.getEditableDataComponent(editableProps),
      {
        key: editableDefinition.name,
        value: localValue,
        onChange: (newValue) => {
          setLocalValue(newValue)

          if (shouldReload) {
            updateValueWithReload(editableDefinition.name, { type: editableDefinition.type, data: newValue })
          } else {
            updateValue(editableDefinition.name, { type: editableDefinition.type, data: newValue })
          }
        }
      }
    )
  }, [editableType, editableProps, localValue, editableDefinition.name, editableDefinition.type, updateValue, updateValueWithReload])

  if (isNil(editableType)) {
    return (
      <Alert
        message={ (<>Editable type &quot;{editableDefinition.type}&quot; not found:<p>{JSON.stringify(editableDefinition)}</p></>) }
        type="warning"
      />
    )
  }

  const label = editableType.getLabel(editableProps)

  return (
    <FieldWidthProvider fieldWidthValues={ { large: 9999 } }>
      {
        !isUndefined(label)
          ? (
            <Form.Item
              label={ label }
              layout="vertical"
            >
              { renderEditableComponent }
            </Form.Item>
            )
          : (
              renderEditableComponent
            )
      }
    </FieldWidthProvider>
  )
}
