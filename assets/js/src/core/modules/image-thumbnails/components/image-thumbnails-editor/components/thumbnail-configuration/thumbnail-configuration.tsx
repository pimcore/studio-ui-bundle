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
import { Space } from '@Pimcore/components/space/space'
import { Card } from '@Pimcore/components/card/card'
import { Descriptions } from 'antd'

export interface ThumbnailConfigurationProps {
  thumbnail: ThumbnailConfigurationData
}

export const ThumbnailConfiguration = ({ thumbnail }: ThumbnailConfigurationProps): React.JSX.Element => {
  const { t } = useTranslation()

  const items = [
    {
      key: 'id',
      label: t('id'),
      children: thumbnail.id
    },
    {
      key: 'name',
      label: t('name'),
      children: thumbnail.name
    },
    {
      key: 'writeable',
      label: t('image-thumbnails.configuration.writeable'),
      children: thumbnail.writeable ? t('yes') : t('no')
    }
  ]

  return (
    <Content>
      <Space
        direction="vertical"
        size="large"
        style={ { width: '100%' } }
      >
        <Card
          size="small"
          title={ t('image-thumbnails.configuration.basic-settings') }
        >
          <Descriptions
            bordered
            column={ 1 }
            items={ items }
            size="small"
          />
        </Card>

        <Card
          size="small"
          title={ t('image-thumbnails.configuration.advanced-settings') }
        >
          <div style={ { color: '#666', fontStyle: 'italic' } }>
            {t('image-thumbnails.configuration.coming-soon')}
          </div>
        </Card>
      </Space>
    </Content>
  )
}
