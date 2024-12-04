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

import React, { useEffect, useState } from 'react'
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import { ImageTarget } from '@Pimcore/components/image-target/image-target'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Flex } from '@Pimcore/components/flex/flex'

export interface ImageGalleryProps {
  value?: ImageGalleryValue | null
  className?: string
  onChange?: (value: ImageGalleryValue | null) => void
}

export type ImageGalleryValue = ImageGalleryValueItem[]

export interface ImageGalleryValueItem {
  // hotspots: [],
  // marker: [],
  // crop: []
  image: ImageValue
}

export const ImageGallery = (props: ImageGalleryProps): React.JSX.Element => {
  const [value, setValue] = useState<ImageGalleryValue>(props.value ?? [])

  console.log(setValue)

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

  return (
    <Flex
      gap="small"
      wrap
    >
      { value.map((item, index) => (
        <ImagePreview
          assetId={ item.image.id }
          height={ 100 }
          key={ index }
          width={ 200 }
        />
      )) }
      <ImageTarget
        dndIcon
        height={ 'auto' }
        title={ 'add item' }
        uploadIcon
        width={ 200 }
      />
    </Flex>
  )
}
