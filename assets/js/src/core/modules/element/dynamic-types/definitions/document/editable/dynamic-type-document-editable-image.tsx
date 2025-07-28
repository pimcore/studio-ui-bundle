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
import { injectable } from 'inversify'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { DocumentImageEditable, type ImageEditableValue } from './components/image-editable/image-editable'

@injectable()
export class DynamicTypeDocumentEditableImage extends DynamicTypeDocumentEditableAbstract {
  id: string = 'image'

  getEditableDataComponent (props: AbstractDocumentEditableDefinition): React.ReactElement {
    return (
      <DocumentImageEditable
        config={ props.config }
        disabled={ props.inherited }
        value={ props.value }
      />
    )
  }

  transformValue (value: any, props: AbstractDocumentEditableDefinition): ImageEditableValue {
    if (value === null || value === undefined) {
      return {
        id: undefined,
        alt: '',
        title: '',
        hotspots: [],
        marker: [],
        crop: {}
      }
    }

    return {
      id: value.id ?? undefined,
      alt: value.alt ?? '',
      title: value.title ?? '',
      hotspots: value.hotspots ?? [],
      marker: value.marker ?? [],
      crop: value.crop ?? {}
    }
  }

  reloadOnChange (props: AbstractDocumentEditableDefinition): boolean {
    return Boolean(props.config?.reload)
  }
}
