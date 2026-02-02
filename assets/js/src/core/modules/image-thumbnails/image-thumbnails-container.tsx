/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { ImageThumbnailsTree } from './components/image-thumbnails-tree/image-thumbnails-tree'
import { ImageThumbnailsEditor } from './components/image-thumbnails-editor/image-thumbnails-editor'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { useStyles } from './image-thumbnails-container.styles'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'

export const ImageThumbnailsContainer = (): React.JSX.Element => {
  const { styles } = useStyles()
  const [selectedThumbnail, setSelectedThumbnail] = useState<ThumbnailConfigurationData | null>(null)

  const handleThumbnailSelect = (thumbnail: ThumbnailConfigurationData): void => {
    setSelectedThumbnail(thumbnail)
  }

  return (
    <Flex
      className={ styles.container }
      style={ { height: '100%' } }
    >
      <SplitLayout
        leftItem={{
          size: 25,
          minSize: 200,
          children: (
            <ImageThumbnailsTree
              onThumbnailSelect={ handleThumbnailSelect }
              selectedThumbnail={ selectedThumbnail }
            />
          )
        }}
        rightItem={{
          size: 75,
          children: (
            <ImageThumbnailsEditor
              selectedThumbnail={ selectedThumbnail }
            />
          )
        }}
        withDivider
        resizeAble
      />
    </Flex>
  )
}
