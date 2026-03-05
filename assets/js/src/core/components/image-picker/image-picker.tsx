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
import { Card } from '@Pimcore/components/card/card'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { Flex, Icon, Space, Text, type DragAndDropInfo } from '@sdk/components'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './image-picker.styles'
import { ImageFooter, type ImageValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/footer'
import { useTranslation } from '@sdk/app'
import { isUndefined } from 'lodash'

export interface ImagePickerValue {
  type: 'asset'
  id: number
  fullPath: string
}

export interface ImagePickerProps {
  width?: string | number | null
  height?: string | number | null
  disabled?: boolean
  value?: ImagePickerValue | null
  onChange?: (value: ImagePickerValue | null) => void
  type: 'upload' | 'add'
  description?: string
  className?: string
  placeholder?: string
  allowedTypes?: string[]
}

export const ImagePicker = (props: ImagePickerProps): React.JSX.Element => {
  const imageValue = props.value ?? null
  const allowedTypes = props.allowedTypes ?? ['image']

  const { t } = useTranslation()
  const { styles } = useStyles()

  const clearValue = (): void => {
    props.onChange?.(null)
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

  const footerValue = imageValue !== null
    ? {
        type: imageValue.type,
        id: imageValue.id,
        fullpath: imageValue.fullPath
      }
    : null

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 150)

  return (
    <Flex
      gap={ 'mini' }
      vertical
    >
      {!isUndefined(props.description) && (
      <Space size={ 'mini' }>
        <Icon
          className={ styles.icon }
          options={ { height: 16, width: 16 } }
          value={ 'drop-target' }
        />
        <Text type='secondary'>{t(props.description)}</Text>
      </Space>
      )}
      <Card
        className={ cn('max-w-full', styles.imagePicker, props.className) }
        fitContent
        footer={ (
          <ImageFooter
            disabled={ props.disabled }
            emptyValue={ clearValue }
            key="image-picker-footer"
            setValue={ handleFooterChange }
            value={ footerValue }
          />
      ) }
      >
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
          isValidData={ (info: DragAndDropInfo) =>
            info.type === 'asset' && allowedTypes.includes(String(info.data.type))
        }
          onDrop={ (info: DragAndDropInfo) => {
            props.onChange?.({
              type: 'asset',
              id: Number(info.data.id),
              fullPath: String(info.data.fullPath)
            })
          } }
          variant="outline"
        >
          {imageValue !== null
            ? (
              <ImagePreview
                assetId={ imageValue?.id }
                height={ height! }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                addIcon={ props.disabled !== true && props.type === 'add' }
                dndIcon={ props.disabled !== true }
                height={ height }
                title={ t(props.disabled !== true ? 'image.dnd-target' : 'empty') }
                uploadIcon={ props.disabled !== true && props.type === 'upload' }
                width={ width }
              />
              )}
        </Droppable>
      </Card>
    </Flex>
  )
}
