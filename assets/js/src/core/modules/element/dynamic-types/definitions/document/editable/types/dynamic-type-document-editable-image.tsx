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
import { DocumentImageEditable } from '../components/image-editable/image-editable'
import { isNil } from 'lodash'

export interface ImageEditableConfig {
  title?: string
  width?: number
  height?: number
  thumbnail?: string | object
  hidetext?: boolean
  reload?: boolean
  minWidth?: number
  minHeight?: number
  ratioX?: number
  ratioY?: number
  uploadPath?: string
  disableInlineUpload?: boolean
  highResolution?: number
  dropClass?: string
  deferred?: boolean
  class?: string
  predefinedDataTemplates?: {
    marker?: Array<{
      menuName: string
      name: string
      data: any[]
    }>
    hotspot?: Array<{
      menuName: string
      name: string
      data: any[]
    }>
  }
  cacheBuster?: boolean
  required?: boolean
}

export interface ImageEditableValue {
  id?: number
  path?: string
  alt?: string
  title?: string
  hotspots?: any[]
  marker?: any[]
  crop?: {
    cropTop?: number
    cropLeft?: number
    cropWidth?: number
    cropHeight?: number
    cropPercent?: boolean
  }
}

export type ImageEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: ImageEditableConfig
}

export class DynamicTypeDocumentEditableImage extends DynamicTypeDocumentEditableAbstract {
  id: string = 'image'

  getEditableDataComponent (props: ImageEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <DocumentImageEditable
        config={ props.config }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
      />
    )
  }

  transformValue (value: any, props: ImageEditableDefinition): ImageEditableValue | null {
    if (isNil(value)) {
      return null
    }

    if (typeof value === 'object') {
      return value
    }

    return null
  }

  transformValueForApi (value: ImageEditableValue | null, props: ImageEditableDefinition): any {
    if (isNil(value)) {
      return null
    }

    return value
  }

  private getImageId(value: ImageEditableValue | null | undefined): number | undefined {
    if (isNil(value) || typeof value !== 'object') {
      return undefined
    }
    return value.id
  }

  reloadOnChange (props: ImageEditableDefinition, oldValue?: any, newValue?: any): boolean {
    if (!Boolean(props.config?.reload)) {
      return false
    }

    if (isNil(oldValue) || isNil(newValue)) {
      return Boolean(props.config?.reload)
    }

    const oldImageId = this.getImageId(oldValue)
    const newImageId = this.getImageId(newValue)

    return oldImageId !== newImageId
  }
}
