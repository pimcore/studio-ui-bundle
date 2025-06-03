import React from 'react'
import { AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract';
import { InputNumber } from '@sdk/components';

export class DynamicTypeDocumentEditableNumeric extends DynamicTypeDocumentEditableAbstract {
  id: string = 'numeric'

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <InputNumber />
    )
  }
}