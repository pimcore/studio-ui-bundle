import { AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract';
import React from 'react';
import ReactDOM from 'react-dom';
import { useInjection } from '@Pimcore/app/depency-injection';
import { DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry';
import { serviceIds } from '@Pimcore/app/config/services/service-ids';
import { RenderEditable } from '../components/editables-renderer/render-editable';

export const DocumentEditorIframeAppView = (): React.JSX.Element => {
    const editableDefinitions: AbstractDocumentEditableDefinition[] = window['editableDefinitions'] ?? [];
    const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
    
    return (
        <>
            {editableDefinitions.map(editable => {
                const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined
      
                const targetElement = document.getElementById(editable.id);
                if (targetElement && editableType?.initializeInIframe === true) {
                    return ReactDOM.createPortal(
                        <RenderEditable editableDefinition={editable} />,
                        targetElement
                    );
                }
                return null;
            })}
        </>
    );
};
