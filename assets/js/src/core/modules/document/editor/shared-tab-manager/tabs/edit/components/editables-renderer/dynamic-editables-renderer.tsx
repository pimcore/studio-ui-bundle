/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createRef, useMemo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { RenderEditable } from './render-editable'
import { isNull } from 'lodash'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { documentEditableApi } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'

export interface DynamicEditablesRendererProps {
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const DynamicEditablesRenderer = ({ editableDefinitions }: DynamicEditablesRendererProps): React.JSX.Element => {
  const editableRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {}
    editableDefinitions.forEach(editable => {
      refs[editable.id] = createRef<HTMLDivElement>()
    })
    return refs
  }, [editableDefinitions])

  useEffect(() => {
    documentEditableApi.registerDynamicEditables(editableDefinitions)

    return () => {
      const editableIds = editableDefinitions.map(editable => editable.id)
      documentEditableApi.unregisterDynamicEditables(editableIds)
    }
  }, [editableDefinitions])

  return (
    <>
      {editableDefinitions.map(editable => {
        const targetElement = document.getElementById(editable.id)
        if (!isNull(targetElement)) {
          // Assign the DOM element to the ref's current property
          if (!isNull(editableRefs[editable.id]) && isNull(editableRefs[editable.id].current)) {
            (editableRefs[editable.id] as React.MutableRefObject<HTMLDivElement>).current = targetElement as HTMLDivElement
          }

          return ReactDOM.createPortal(
            <RenderEditable
              containerRef={ editableRefs[editable.id] }
              editableDefinition={ editable }
            />,
            targetElement
          )
        }
        return null
      })}
    </>
  )
}
