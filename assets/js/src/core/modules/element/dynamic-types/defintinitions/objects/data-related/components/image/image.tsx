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
import { Card } from '@Pimcore/components/card/card'
import {
  ImageFooter
} from './footer'
import { ImageTarget } from '@Pimcore/components/image-target/image-target'
import { useTranslation } from 'react-i18next'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@Pimcore/components/drag-and-drop/context-provider'

export interface ImageValue {
  type: 'asset'
  id: number
}

export interface ImageProps {
  width: string | null
  height: string | null
  disabled?: boolean
  value?: ImageValue | null
  onChange?: (value: ImageValue | null) => void
}

export const Image = (props: ImageProps): React.JSX.Element => {
  const [value, setValue] = React.useState<ImageValue | null>(props.value ?? null)
  const { t } = useTranslation()
  const emptyValue = (): void => {
    setValue(null)
  }

  useEffect(() => {
    props.onChange?.(value)
  }, [value])

  return (
    <>
      <Card
        className="max-w-full"
        fitContent
        footer={ <ImageFooter
          disabled={ props.disabled }
          emptyValue={ emptyValue }
          key="image-footer"
          value={ value }
                 /> }
      >
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => true }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
          onDrop={ (info: DragAndDropInfo) => { setValue({ type: 'asset', id: info.data.id as number }) } }
          variant="outline"
        >
          { value !== null
            ? (
              <ImagePreview
                assetId={ value.id }
                height={ props.height ?? 150 }
                width={ props.width ?? 300 }
              />
              )
            : (
              <ImageTarget
                dndIcon
                height={ props.height ?? 150 }
                title={ t('image.dnd-target') }
                width={ props.width ?? 300 }
              />
              ) }
        </Droppable>
      </Card>
    </>
  )
}
