/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { DocumentPdfEditable } from '../components/pdf-editable/pdf-editable'
import { injectable } from 'inversify'

export interface PdfEditableConfig {
  width?: number
  height?: number
  uploadPath?: string
}

export interface PdfEditableValue {
  id?: number
}

export type PdfEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: PdfEditableConfig
}

@injectable()
export class DynamicTypeDocumentEditablePdf extends DynamicTypeDocumentEditableAbstract {
  id: string = 'pdf'

  getEditableDataComponent (props: PdfEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <DocumentPdfEditable
        config={ props.config }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
      />
    )
  }
}
