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
import { ImageFooter } from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './image.styles'

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
}

export const Image = (props: ImageProps): React.JSX.Element => {
  const imageValue = props.value ?? null

  const { t } = useTranslation()
  const { styles } = useStyles()

  const clearValue = (): void => {
    props.onChange?.(null)
  }

  const handleChange = (value: ImageValue | null): void => {
    props.onChange?.(value)
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
          setValue={ handleChange }
          value={ imageValue }
        />)
      }
    >
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
        isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
        onDrop={ (info: DragAndDropInfo) => { props.onChange?.({ type: 'asset', id: info.data.id as number }) } }
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
              title={ t(props.disabled !== true ? 'image.dnd-target' : 'empty') }
              uploadIcon={ props.disabled !== true }
              width={ width }
            />
            )
        }
      </Droppable>
    </Card>
  )
}
