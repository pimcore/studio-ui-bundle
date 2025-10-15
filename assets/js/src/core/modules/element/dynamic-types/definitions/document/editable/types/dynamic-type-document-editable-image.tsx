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
import { ImageEditable } from '../components/image-editable/image-editable'
import { isNil, isPlainObject, isUndefined } from 'lodash'
import { type ImageEditableConfig, type ImageEditableValue } from './image-editable-types'

export type ImageEditableDefinition = Omit<AbstractDocumentEditableDefinition, 'config'> & {
  config?: ImageEditableConfig
}

export class DynamicTypeDocumentEditableImage extends DynamicTypeDocumentEditableAbstract {
  id: string = 'image'

  getEditableDataComponent (props: ImageEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ImageEditable
        config={ props.config }
        containerRef={ props.containerRef }
        inherited={ props.inherited }
      />
    )
  }

  transformValue (value: any, props: ImageEditableDefinition): ImageEditableValue | null {
    if (isNil(value)) {
      return null
    }

    if (typeof value === 'object') {
      const { cropTop, cropLeft, cropWidth, cropHeight, cropPercent, ...otherProps } = value

      const hasCropData = !isUndefined(cropTop) || !isUndefined(cropLeft) ||
                         !isUndefined(cropWidth) || !isUndefined(cropHeight) ||
                         !isUndefined(cropPercent)

      return {
        ...otherProps,
        ...(hasCropData && {
          crop: {
            ...(!isUndefined(cropTop) && { cropTop }),
            ...(!isUndefined(cropLeft) && { cropLeft }),
            ...(!isUndefined(cropWidth) && { cropWidth }),
            ...(!isUndefined(cropHeight) && { cropHeight }),
            ...(!isUndefined(cropPercent) && { cropPercent })
          }
        })
      }
    }

    return null
  }

  transformValueForApi (value: ImageEditableValue | null, props: ImageEditableDefinition): any {
    if (isNil(value)) {
      return null
    }

    const { crop, ...otherProps } = value

    return {
      ...otherProps,
      ...crop
    }
  }

  private getImageId (value: ImageEditableValue | null | undefined): number | undefined {
    if (isNil(value) || typeof value !== 'object') {
      return undefined
    }
    return value.id
  }

  isEmpty (value: ImageEditableValue | null | undefined, props: ImageEditableDefinition): boolean {
    if (!isNil(value) && isPlainObject(value)) {
      return isNil(value.id)
    }

    return true
  }

  reloadOnChange (props: ImageEditableDefinition, oldValue: any, newValue: any): boolean {
    if (props.config?.reload !== true) {
      return false
    }

    if (isNil(oldValue) || isNil(newValue)) {
      return props.config.reload
    }

    const oldImageId = this.getImageId(oldValue as ImageEditableValue)
    const newImageId = this.getImageId(newValue as ImageEditableValue)

    return oldImageId !== newImageId
  }
}
