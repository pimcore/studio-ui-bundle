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
import { Panel } from '@Pimcore/components/panel/panel'
import { Form } from '@Pimcore/components/form/form'
import { Text } from '@Pimcore/components/text/text'
import { ImageUpload, type ImageUploadValue } from '@Pimcore/components/image-upload/image-upload'
import { type RelatedElementData } from '@Pimcore/modules/app/settings/settings-slice.gen'

interface ImagePanelProps {
  titleKey: string
  descriptionKey: string
  fieldName: string | string[]
  width?: string | number | null
  height?: string | number | null
}

export const ImagePanel = ({ titleKey, descriptionKey, fieldName, width = 300, height = 150 }: ImagePanelProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Panel
      title={t(titleKey)}
      border= {false}
      theme="card-with-highlight"
      contentPadding="small"
      collapsed={ false }
      collapsible
    >
      <Text className="mb-4" type="secondary">
        {t(descriptionKey)}
      </Text>
      
      <Form.Item 
        name={fieldName}
        getValueFromEvent={(value: ImageUploadValue | null) => {
          return value ? {
            id: value.id,
            type: value.type || 'asset',
            subtype: 'image', // Default subtype for images
            fullPath: value.fullPath,
            isPublished: true // Default to published
          } : null
        }}
        getValueProps={(value: RelatedElementData | null) => {
          return {
            value: value 
              ? { 
                  type: 'asset' as const, 
                  id: value.id,
                  fullPath: value.fullPath
                } 
              : null
          }
        }}
      >
        <ImageUpload
          width={width}
          height={height}
          allowedTypes={['image']}
        />
      </Form.Item>
    </Panel>
  )
}
