/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useState } from 'react'
import { Alert, Form } from '@sdk/components'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { isNil, isUndefined } from 'lodash'
import { FieldWidthProvider } from '@sdk/modules/element'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'
import { useDocumentEditor } from '../../provider/use-document-editor'
interface RenderEditableProps {
  editableDefinition: AbstractDocumentEditableDefinition
}

export const RenderEditable = ({ editableDefinition }: RenderEditableProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const editableType = documentEditableRegistry.hasDynamicType(editableDefinition.type) ? documentEditableRegistry.getDynamicType(editableDefinition.type) : undefined
  const { id } = useContext(DocumentContext)
  const { markDocumentEditablesAsModified } = useDocumentDraft(id)
  const { updateValue, getValue } = useDocumentEditor()

  const [localValue, setLocalValue] = useState(getValue(editableDefinition.name))

  if (isNil(editableType)) {
    return (
      <Alert
        message={ (<>Editable type &quot;{editableDefinition.type}&quot; not found:<p>{JSON.stringify(editableDefinition)}</p></>) }
        type="warning"
      />
    )
  }

  const renderEditableComponent = (): React.ReactElement => {
    return React.cloneElement(
      editableType.getEditableDataComponent(editableDefinition),
      {
        key: editableDefinition.name,
        value: localValue,
        onChange: (newValue) => {
          setLocalValue(newValue)
          updateValue(editableDefinition.name, newValue)
          markDocumentEditablesAsModified()
        }
      }
    )
  }

  const label = editableType.getLabel(editableDefinition)

  return (
    <FieldWidthProvider fieldWidthValues={ { large: 9999 } }>
      {
        !isUndefined(label)
          ? (
            <Form.Item
              label={ label }
              layout="vertical"
            >
              { renderEditableComponent() }
            </Form.Item>
            )
          : (
              renderEditableComponent()
            )
      }
    </FieldWidthProvider>
  )
}
