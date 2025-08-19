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
import { isNil } from 'lodash'
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
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
      />
    )
  }

  transformValue (value: any, props: PdfEditableDefinition): PdfEditableValue | null {
    if (isNil(value)) {
      return null
    }

    if (typeof value === 'object') {
      return value
    }

    return null
  }

  transformValueForApi (value: PdfEditableValue | null, props: PdfEditableDefinition): any {
    if (isNil(value)) {
      return null
    }

    return value
  }

  reloadOnChange (props: PdfEditableDefinition, oldValue: any, newValue: any): boolean {
    // PDF editables don't support reload configuration, so never reload
    return false
  }
}
