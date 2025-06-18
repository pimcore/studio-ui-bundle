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
import { StyleProvider } from '@ant-design/cssinjs'
import { useDocumentEditor } from '../../provider/use-document-editor'

export interface EditableRendererProps {
  iframeRef: RefObject<HTMLIFrameElement>
  styleSheet: CSSStyleSheet
}

const getTargetContainer = (
  targetElement: HTMLElement | null,
  editableType: DynamicTypeDocumentEditableAbstract | undefined,
  styleSheet: CSSStyleSheet
): HTMLElement | null => {
  if (isNull(targetElement)) {
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

const getInitialData = (editableDefinitions: AbstractDocumentEditableDefinition[]): Record<string, {type: string, data: any}> => {
  const initialData: Record<string, any> = {}
  editableDefinitions.forEach((editable) => {
    initialData[editable.name] = {
      type: editable.type,
      data: editable.data ?? null
    }
  })
  return initialData
}

interface DocumentEditorIframeWindow extends Window {
  editableDefinitions?: AbstractDocumentEditableDefinition[]
  clipboardData?: any
}

export const EditablesRenderer = (props: EditableRendererProps): React.JSX.Element => {
  const editableDefinitions: AbstractDocumentEditableDefinition[] = (props.iframeRef.current?.contentWindow as DocumentEditorIframeWindow | null)?.editableDefinitions ?? [];
  const iframeDocument = props.iframeRef.current?.contentDocument;
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry']);
  const { initializeData } = useDocumentEditor();

  initializeData(getInitialData(editableDefinitions));

  return (
    <>
      {editableDefinitions.map((editable) => {
        const targetElement = iframeDocument?.getElementById(editable.id) ?? null;
        const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined;
        const targetContainer = getTargetContainer(targetElement, editableType, props.styleSheet);

        if (!isNull(targetContainer)) {
          if (editableType?.useShadowDom !== true) {
            return ReactDOM.createPortal(
              <RenderEditable editableDefinition={editable} />,
              targetContainer
            );
          } else {
            return ReactDOM.createPortal(
              <StyleProvider container={targetContainer}>
                <RenderEditable editableDefinition={editable} />
              </StyleProvider>,
              targetContainer
            );
          }
        }

        return null;
      })}
    </>
  );
};
