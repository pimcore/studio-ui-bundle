/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import React, { useRef, createRef } from 'react'
import ReactDOM from 'react-dom'
import { RenderEditable } from './render-editable'
import { isNull, isUndefined } from 'lodash'

export interface EditablesRendererProps {
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const EditablesRenderer = ({ editableDefinitions }: EditablesRendererProps): React.JSX.Element => {
  const editableContainerRefs = useRef<Record<string, React.RefObject<HTMLDivElement>>>({})

  // Create refs for each editable if they don't exist
  editableDefinitions.forEach(editable => {
    if (isUndefined(editableContainerRefs.current[editable.id])) {
      editableContainerRefs.current[editable.id] = createRef<HTMLDivElement>()
    }
  })

  return (
    <>
      {editableDefinitions.map(editable => {
        const targetElement = document.getElementById(editable.id)
        if (!isNull(targetElement)) {
          // Assign the DOM element to the ref's current property
          if (!isNull(editableContainerRefs.current[editable.id]) && isNull(editableContainerRefs.current[editable.id].current)) {
            (editableContainerRefs.current[editable.id] as React.MutableRefObject<HTMLDivElement>).current = targetElement as HTMLDivElement
          }

          return ReactDOM.createPortal(
            <RenderEditable
              containerRef={ editableContainerRefs.current[editable.id] }
              editableDefinition={ editable }
              key={ editable.id }
            />,
            targetElement
          )
        }
        return null
      })}
    </>
  )
}
