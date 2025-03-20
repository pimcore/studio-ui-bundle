/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useEffect } from 'react'
import cn from 'classnames'
import { Card } from '@Pimcore/components/card/card'
import {
  ImageFooter
} from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
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
  const [value, setValue] = React.useState<ImageValue | null>(props.value ?? null)
  const { t } = useTranslation()
  const { styles } = useStyles()

  const emptyValue = (): void => {
    setValue(null)
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 150)

  return (
    <Card
      className={ cn('max-w-full', styles.image, props.className) }
      fitContent
      footer={ <ImageFooter
        disabled={ props.disabled }
        emptyValue={ emptyValue }
        key="image-footer"
        setValue={ setValue }
        value={ value }
               /> }
    >
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
        isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
        onDrop={ (info: DragAndDropInfo) => { setValue({ type: 'asset', id: info.data.id as number }) } }
        variant="outline"
      >
        { value !== null
          ? (
            <ImagePreview
              assetId={ value.id }
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
            ) }
      </Droppable>
    </Card>
  )
}
