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
import { Content } from '@Pimcore/components/content/content'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useStyles } from './image-thumbnails-editor.styles'

export interface ImageThumbnailsEditorProps {
  selectedThumbnail: ThumbnailConfigurationData | null
}

export const ImageThumbnailsEditor = ({ selectedThumbnail }: ImageThumbnailsEditorProps): React.JSX.Element => {
  const { styles } = useStyles()

  console.log('Selected thumbnail in editor:', selectedThumbnail);
  
  const tabItems = []

  return (
    <div className={ styles.container }>
      <Content
        className={ styles.content }
        padded
      >
        <Tabs
          items={ tabItems }
          size="small"
          type="card"
        />
      </Content>
    </div>
  )
}
