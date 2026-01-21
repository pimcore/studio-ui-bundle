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
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@sdk/components'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './image-upload.styles'
import { ImageFooter, type ImageValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer'


export interface ImageUploadValue {
  type: 'asset'
  id: number
  fullPath: string
}

export interface ImageUploadProps {
  width?: string | number | null
  height?: string | number | null
  disabled?: boolean
  value?: ImageUploadValue | null
  onChange?: (value: ImageUploadValue | null) => void
  className?: string
  placeholder?: string
  allowedTypes?: string[]
}

export const ImageUpload = (props: ImageUploadProps): React.JSX.Element => {
  const imageValue = props.value ?? null
  const allowedTypes = props.allowedTypes ?? ['image']

  const { t } = useTranslation()
  const { styles } = useStyles()

  const clearValue = (): void => {
    props.onChange?.(null)
  }

  const handleChange = (value: ImageUploadValue | null): void => {
    props.onChange?.(value)
  }

  const handleFooterChange = (value: ImageValue | null): void => {
    if (value === null) {
      props.onChange?.(null)
    } else {
      props.onChange?.({
        type: value.type,
        id: value.id,
        fullPath: value.fullpath ?? ''
      })
    }
  }

  const footerValue = imageValue ? {
    type: imageValue.type,
    id: imageValue.id,
    fullpath: imageValue.fullPath
  } : null

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 150)

  return (
    <Card
      className={cn('max-w-full', styles.imageUpload, props.className)}
      fitContent
      footer={(
        <ImageFooter
          disabled={props.disabled}
          emptyValue={clearValue}
          key="image-upload-footer"
          setValue={handleFooterChange}
          value={footerValue}
        />
      )}
    >
      <Droppable
        isValidContext={(info: DragAndDropInfo) => props.disabled !== true}
        isValidData={(info: DragAndDropInfo) => 
          info.type === 'asset' && allowedTypes.includes(info.data.type)
        }
        onDrop={(info: DragAndDropInfo) => {
            console.log("info", info);
            
          props.onChange?.({
            type: 'asset',
            id: info.data.id as number,
            fullPath: info.data.fullPath
          })
        }}
        variant="outline"
      >
        {imageValue !== null ? (
          <ImagePreview
            assetId={imageValue?.id}
            height={height!}
            width={width!}
          />
        ) : (
          <AssetTarget
            dndIcon={props.disabled !== true}
            height={height}
            title={ t(props.disabled !== true ? 'image.dnd-target' : 'empty') }
            uploadIcon={props.disabled !== true}
            width={width}
          />
        )}
      </Droppable>
    </Card>
  )
}
