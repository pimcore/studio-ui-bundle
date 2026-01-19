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
import { Image, type ImageValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'

interface ImagePanelProps {
  titleKey: string
  descriptionKey: string
  fieldName: string | string[]
  width?: string | number | null
  height?: string | number | null
}

// Component to bridge between string path and ImageValue
const ImageFieldWrapper = ({ value, onChange, width, height }: {
  value?: string
  onChange?: (value: string) => void
  width?: string | number | null
  height?: string | number | null
}): React.JSX.Element => {
  // Convert string path to ImageValue for the Image component
  const imageValue: ImageValue | null = value && value.trim() !== '' 
    ? { type: 'asset', id: parseInt(value) || 0 } 
    : null

  const handleImageChange = (newValue: ImageValue | null): void => {
    // Convert ImageValue back to string for the form
    const stringValue = newValue ? newValue.id.toString() : ''
    onChange?.(stringValue)
  }

  return (
    <Image
      value={imageValue}
      onChange={handleImageChange}
      width={width ?? 300}
      height={height ?? 150}
    />
  )
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
      
      <Form.Item name={fieldName}>
        <ImageFieldWrapper
          width={width}
          height={height}
        />
      </Form.Item>
    </Panel>
  )
}
