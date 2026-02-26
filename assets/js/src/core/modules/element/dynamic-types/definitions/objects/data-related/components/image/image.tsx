/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { ImageFooter } from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@sdk/components'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './image.styles'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import {
  useElementSelector
} from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import {
  SelectionType
} from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { isEmpty } from 'lodash'

export interface ImageValue {
  type: 'asset'
  id: number
}

export interface ImageProps {
  width: string | number | null
  height: string | number | null
  disabled?: boolean
  value?: ImageValue | null
  onChange?: (value: ImageValue | null) => void
  className?: string
  uploadPath?: string
}

export const Image = (props: ImageProps): React.JSX.Element => {
  const imageValue = props.value ?? null
  const { triggerUpload } = useUploadModal({})

  const { t } = useTranslation()
  const { styles } = useStyles()

  const clearValue = (): void => {
    props.onChange?.(null)
  }

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      asset: true,
      object: false,
      document: false
    },
    config: {
      assets: {
        allowedTypes: ['image']
      }
    },
    onFinish: (event) => {
      if (!isEmpty(event.items)) {
        props.onChange?.({ type: 'asset', id: event.items[0].data.id })
      }
    }
  })

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: props.uploadPath ?? '',
      accept: 'image/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          props.onChange?.({ type: 'asset', id: assets[0].id })
        }
      }
    })
  }, [triggerUpload])

  const handleChange = (value: ImageValue | null): void => {
    props.onChange?.(value)
  }

  const handleDroppableDrop = (info: DragAndDropInfo): void => {
    props.onChange?.({ type: 'asset', id: info.data.id as number })
  }

  const handleFileSystemUpload = async (asset: any): Promise<void> => {
    props.onChange?.({ type: 'asset', id: asset.id })
  }

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 150)

  return (
    <Card
      className={ cn('max-w-full', styles.image, props.className) }
      fitContent
      footer={ (
        <ImageFooter
          disabled={ props.disabled }
          emptyValue={ clearValue }
          key="image-footer"
          onSearch={ openElementSelector }
          onUpload={ handleUpload }
          setValue={ handleChange }
          value={ imageValue }
        />)
      }
    >
      <InlineUpload
        accept="image/*"
        assetType="image"
        disabled={ props.disabled }
        onSuccess={ handleFileSystemUpload }
        targetFolderPath={ props.uploadPath ?? '' }
      >
        <Droppable
          disabled={ props.disabled }
          isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
          onDrop={ handleDroppableDrop }
          variant="outline"
        >
          { imageValue !== null
            ? (
              <ImagePreview
                assetId={ imageValue?.id }
                height={ height! }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true }
                height={ height }
                onSearch={ openElementSelector }
                onUpload={ handleUpload }
                title={ t(props.disabled === true ? 'empty' : 'image.add.and.dnd') }
                width={ width }
              />
              )
          }
        </Droppable>
      </InlineUpload>
    </Card>
  )
}
