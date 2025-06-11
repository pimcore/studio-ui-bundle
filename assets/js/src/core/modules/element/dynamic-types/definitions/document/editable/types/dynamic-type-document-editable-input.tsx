import React from 'react'
import { AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract';
import ContentEditable from '../components/content-editable/content-editable';

export class DynamicTypeDocumentEditableInput extends DynamicTypeDocumentEditableAbstract {
  id: string = 'input'
  initializeInIframe: boolean = true

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ContentEditable />
    )
  }
}