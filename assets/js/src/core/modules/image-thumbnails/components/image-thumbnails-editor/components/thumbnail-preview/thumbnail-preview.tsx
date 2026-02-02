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
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { Card } from '@Pimcore/components/card/card'
import { Empty } from 'antd'

export interface ThumbnailPreviewProps {
  thumbnail: ThumbnailConfigurationData
}

export const ThumbnailPreview = ({ thumbnail }: ThumbnailPreviewProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Content>
      <Card
        size="small"
        title={ t('image-thumbnails.preview.title') }
      >
        <Empty
          description={ t('image-thumbnails.preview.coming-soon') }
          image={ Empty.PRESENTED_IMAGE_SIMPLE }
        />
      </Card>
    </Content>
  )
}
