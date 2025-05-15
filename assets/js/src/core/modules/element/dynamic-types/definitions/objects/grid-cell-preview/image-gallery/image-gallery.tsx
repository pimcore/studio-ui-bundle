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
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isNil } from 'lodash'
import { type ImageGalleryValue } from '../../data-related/components/image-gallery/image-gallery'
import { ImagePreview } from '@Pimcore/components/image-preview/image-preview'
import { Flex } from '@Pimcore/components/flex/flex'

interface ImageGalleryProps {
  value: ImageGalleryValue | null
}

export const ImageGallery = ({ value }: ImageGalleryProps): React.JSX.Element => {
  if (isNil(value)) {
    return <></>
  }

  return (
    <GridCellPreviewWrapper overflow="auto">
      <Flex
        align="center"
        gap="extra-small"
      >
        {value
          .filter(item => item.image?.id)
          .map((item, index) => (
            <div key={ index }>
              <ImagePreview
                assetId={ item.image?.id }
                height={ 100 }
                width={ 100 }
              />
            </div>
          ))}
      </Flex>
    </GridCellPreviewWrapper>
  )
}
