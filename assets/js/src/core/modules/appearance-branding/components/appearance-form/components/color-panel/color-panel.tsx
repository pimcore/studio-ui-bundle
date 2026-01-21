/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ColorPicker } from '@Pimcore/components/color-picker/color-picker'
import { Form } from '@Pimcore/components/form/form'
import { Panel } from '@Pimcore/components/panel/panel'
import { Space } from '@Pimcore/components/space/space'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ColorPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()

  const formatColor = (color: any): string | null => {
    if (color?.cleared) {
      return null
    }
    if (color?.metaColor) {
      const { r, g, b } = color.metaColor
      return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    }

    
    return color || null
  }

  return (
    <Panel
      title={t('appearance-branding.color.title')}
      theme="card-with-highlight"
      border= {false}
      contentPadding="small"
      collapsed={ false }
      collapsible
    >
      <Space
        direction="vertical"
        size="large"
      >
        <Form.Item
          label={t('appearance-branding.color.brand-color.label')}
          name={['branding', 'brandColor']}
        >
          <ColorPicker 
            showText 
            format="hex"
            onChange={(color) => {
              const hexValue = formatColor(color)
              form.setFieldValue(['branding', 'brandColor'], hexValue)
            }}
          />
          <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
            {t('appearance-branding.color.brand-color.description')}
          </div>
        </Form.Item>

        <Form.Item
          label={t('appearance-branding.color.background-shade.label')}
          name={['branding', 'backgroundShade']}
        >
          <ColorPicker 
            showText 
            format="hex"
            onChange={(color) => {
              const hexValue = formatColor(color)
              form.setFieldValue(['branding', 'backgroundShade'], hexValue)
            }}
          />
          <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
            {t('appearance-branding.color.background-shade.description')}
          </div>
        </Form.Item>
      </Space>
    </Panel>
  )
}
