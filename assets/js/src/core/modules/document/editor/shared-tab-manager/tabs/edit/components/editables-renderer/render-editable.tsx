import React from 'react';
import { Alert, Form } from '@sdk/components';
import { AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract';
import { DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry';
import { serviceIds, useInjection } from '@sdk/app';
import { isNil } from 'lodash';
import { ElementSelectorProvider, FieldWidthProvider } from '@sdk/modules/element';

interface RenderEditableProps {
    editableDefinition: AbstractDocumentEditableDefinition;
}

export const RenderEditable = ({ editableDefinition }: RenderEditableProps): React.JSX.Element => {
    const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
    const editableType = documentEditableRegistry.hasDynamicType(editableDefinition.type) ? documentEditableRegistry.getDynamicType(editableDefinition.type) : undefined
    if (isNil(editableType)) {
        return <Alert message={(<>Editable type "{editableDefinition.type}" not found:<p>{JSON.stringify(editableDefinition)}</p></>)} type="warning" />
    }
    return (

        <ElementSelectorProvider>
            <FieldWidthProvider>
                    <Form initialValues={{ [editableDefinition.id]: editableDefinition.data }}>
                        <Form.Item name={editableDefinition.id}>
                            {editableType.getEditableDataComponent(editableDefinition)}
                        </Form.Item>
                    </Form>
            </FieldWidthProvider>
        </ElementSelectorProvider>
    )
};
