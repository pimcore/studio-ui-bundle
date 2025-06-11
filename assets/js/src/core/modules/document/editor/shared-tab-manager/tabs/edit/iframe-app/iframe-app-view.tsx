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
import React from 'react'
import ReactDOM from 'react-dom'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { RenderEditable } from '../components/editables-renderer/render-editable'
import { isNull } from 'lodash'

export const DocumentEditorIframeAppView = (): React.JSX.Element => {
  const editableDefinitions: AbstractDocumentEditableDefinition[] = window.editableDefinitions ?? []
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])

  return (
    <>
      {editableDefinitions.map(editable => {
        const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined

        const targetElement = document.getElementById(editable.id)
        if (!isNull(targetElement) && editableType?.initializeInIframe === true) {
          return ReactDOM.createPortal(
            <RenderEditable editableDefinition={ editable } />,
            targetElement
          )
        }
        return null
      })}
    </>
  )
}
