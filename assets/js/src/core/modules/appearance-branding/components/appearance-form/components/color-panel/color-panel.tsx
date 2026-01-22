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
import { FastColor } from '@ant-design/fast-color'

export const ColorPanel = (): React.JSX.Element => {
  const { t } = useTranslation()
  const form = Form.useFormInstance()

  const formatColor = (color: any): string | null => {
    if (color?.cleared === true) {
      return null
    }

    if (color?.metaColor != null) {
      const { r, g, b, a = 1 } = color.metaColor
      return new FastColor({ r, g, b, a }).toHexString()
    }

    return color != null ? new FastColor(color as string).toHexString() : null
  }

  return (
    <Panel
      border={ false }
      collapsed={ false }
      collapsible
      contentPadding="small"
      theme="card-with-highlight"
      title={ t('appearance-branding.color.title') }
    >
      <Space
        direction="vertical"
        size="large"
      >
        <Form.Item
          label={ t('appearance-branding.color.brand-color.label') }
          name={ ['branding', 'brandColor'] }
        >
          <ColorPicker
            format="hex"
            onChange={ (color) => {
              const hexValue = formatColor(color)
              form.setFieldValue(['branding', 'brandColor'], hexValue)
            } }
            showText
          />
          <div style={ { marginTop: 8, fontSize: '12px', color: '#666' } }>
            {t('appearance-branding.color.brand-color.description')}
          </div>
        </Form.Item>

        <Form.Item
          label={ t('appearance-branding.color.background-shade.label') }
          name={ ['branding', 'backgroundShade'] }
        >
          <ColorPicker
            format="hex"
            onChange={ (color) => {
              const hexValue = formatColor(color)
              form.setFieldValue(['branding', 'backgroundShade'], hexValue)
            } }
            showText
          />
          <div style={ { marginTop: 8, fontSize: '12px', color: '#666' } }>
            {t('appearance-branding.color.background-shade.description')}
          </div>
        </Form.Item>
      </Space>
    </Panel>
  )
}
