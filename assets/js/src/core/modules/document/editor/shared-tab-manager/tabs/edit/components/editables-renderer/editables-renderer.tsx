/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition, type DynamicTypeDocumentEditableAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'

import { RenderEditable } from './render-editable'
import React, { type RefObject } from 'react'
import ReactDOM from 'react-dom'
import { serviceIds, useInjection } from '@sdk/app'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { isNull } from 'lodash'
import { type DocumentEditorIframeWindow } from '../../iframe-app/iframe-app-view'
import { StyleProvider } from 'antd-style'

export interface EditableRendererProps {
  iframeRef: RefObject<HTMLIFrameElement>
  styleSheet: CSSStyleSheet
}

const getTargetContainer = (
  targetElement: HTMLElement | null,
  editableType: DynamicTypeDocumentEditableAbstract | undefined,
  styleSheet: CSSStyleSheet
): HTMLElement | null => {
  if (isNull(targetElement) || editableType?.initializeInIframe !== false) {
    return null
  }

  if (editableType?.useShadowDom !== true) {
    return targetElement
  }

  const shadowRoot = targetElement.shadowRoot ?? targetElement.attachShadow({ mode: 'open' })

  shadowRoot.adoptedStyleSheets = [styleSheet]

  const shadowContainer = shadowRoot.querySelector('div') ?? document.createElement('div')
  if (isNull(shadowContainer.parentElement)) {
    shadowRoot.appendChild(shadowContainer)
  }

  return shadowContainer
}

export const EditablesRenderer = (props: EditableRendererProps): React.JSX.Element => {
  const editableDefinitions: AbstractDocumentEditableDefinition[] = (props.iframeRef.current?.contentWindow as DocumentEditorIframeWindow | null)?.editableDefinitions ?? []
  const iframeDocument = props.iframeRef.current?.contentDocument
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])

  return (
    <>
      {editableDefinitions.map((editable) => {
        const targetElement = iframeDocument?.getElementById(editable.id) ?? null
        const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined

        const targetContainer = getTargetContainer(targetElement, editableType, props.styleSheet)
        if (!isNull(targetContainer)) {
          console.log('styleprovider', editableType?.useShadowDom ? targetContainer : props.iframeRef.current?.contentDocument?.head)
          return ReactDOM.createPortal(
            <StyleProvider container={ editableType?.useShadowDom ? targetContainer : props.iframeRef.current?.contentDocument?.head }>
              <RenderEditable editableDefinition={ editable } />
            </StyleProvider>,
            targetContainer
          )
        }

        return null
      })}
    </>
  )
}
