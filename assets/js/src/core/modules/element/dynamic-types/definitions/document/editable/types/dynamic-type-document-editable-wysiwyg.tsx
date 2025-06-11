import React from 'react'
import { AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract';
import { Wysiwyg } from '@sdk/modules/wysiwyg';

export class DynamicTypeDocumentEditableWysiwyg extends DynamicTypeDocumentEditableAbstract {
  id: string = 'wysiwyg'
  initializeInIframe: boolean = true

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <Wysiwyg />
    )
  }
}