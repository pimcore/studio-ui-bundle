import React from 'react'
import { AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract';
import { ManyToOneRelation } from '@sdk/modules/element';

export class DynamicTypeDocumentEditableRelation extends DynamicTypeDocumentEditableAbstract {
  id: string = 'relation'

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ManyToOneRelation />
    )
  }
}