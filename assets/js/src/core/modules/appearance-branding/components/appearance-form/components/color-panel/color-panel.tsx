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
import { Collapse } from '@Pimcore/components/collapse/collapse'
import { Space } from '@Pimcore/components/space/space'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ColorPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  const items = [
    {
      key: 'color',
      label: t('appearance-branding.color.title'),
      children: (
        <Space
          direction="vertical"
          size="large"
        >
          <Form.Item
            label={t('appearance-branding.color.brand-color.label')}
            name={['branding', 'colorAdminInterface']}
          >
            <ColorPicker showText />
            <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
              {t('appearance-branding.color.brand-color.description')}
            </div>
          </Form.Item>

          <Form.Item
            label={t('appearance-branding.color.background-shade.label')}
            name={['branding', 'colorAdminInterfaceBackground']}
          >
            <ColorPicker showText />
            <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
              {t('appearance-branding.color.background-shade.description')}
            </div>
          </Form.Item>
        </Space>
      )
    }
  ]

  return (
    <Collapse
      defaultActiveKeys={['color']}
      items={items}
    />
  )
}
