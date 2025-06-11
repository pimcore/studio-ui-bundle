import { AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract';

import { RenderEditable } from './render-editable';
import React, { RefObject } from 'react';
import ReactDOM from 'react-dom';
import { serviceIds, useInjection } from '@sdk/app';
import { DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry';

export interface EditableRendererProps {
    iframeRef: RefObject<HTMLIFrameElement>
    styleSheet: CSSStyleSheet
}

const getTargetContainer = (
    targetElement: HTMLElement | null,
    editableType: DynamicTypeDocumentEditableAbstract | undefined,
    styleSheet: CSSStyleSheet
): HTMLElement | null => {
    if (!targetElement || editableType?.initializeInIframe !== false) {
        return null;
    }

    let shadowRoot = targetElement.shadowRoot;
    if (!shadowRoot) {
        shadowRoot = targetElement.attachShadow({ mode: 'open' });
    }

    shadowRoot.adoptedStyleSheets = [styleSheet];

    const shadowContainer = shadowRoot.querySelector('div') ?? document.createElement('div');
    if (!shadowContainer.parentElement) {
        shadowRoot.appendChild(shadowContainer);
    }

    return shadowContainer;
};

export const EditablesRenderer = (props: EditableRendererProps): React.JSX.Element => {
    const editableDefinitions: AbstractDocumentEditableDefinition[] = props.iframeRef.current?.contentWindow?.['editableDefinitions'] ?? []
    const iframeDocument = props.iframeRef.current?.contentDocument;
    const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])

    return (
        <>
            {editableDefinitions.map((editable) => {
                const targetElement = iframeDocument?.getElementById(editable.id) ?? null
                const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined

                const targetContainer = getTargetContainer(targetElement, editableType, props.styleSheet);
                if (targetContainer) {
                    return ReactDOM.createPortal(
                        <RenderEditable editableDefinition={editable} />,
                        targetContainer
                    );
                }

                return null
            })}
        </>
    );
};