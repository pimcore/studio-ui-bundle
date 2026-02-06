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
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import type { MenuProps } from 'antd'

interface TransformationsDropdownProps {
  onSelect: (type: string, subtype?: string) => void
}

export const TransformationsDropdown = ({ onSelect }: TransformationsDropdownProps): React.JSX.Element => {
  const { t } = useTranslation()

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    const [type, subtype] = key.split(':')
    onSelect(type, subtype)
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'resize',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon value="resize" options={{ width: 16, height: 16 }} />
          {t('image-thumbnails.editor.transformations.resize')}
        </div>
      )
    },
    {
      key: 'scale-by-height',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon value="arrows-alt-v" options={{ width: 16, height: 16 }} />
          {t('image-thumbnails.editor.transformations.scale-by-height')}
        </div>
      )
    },
    {
      key: 'trim',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon value="crop" options={{ width: 16, height: 16 }} />
          {t('image-thumbnails.editor.transformations.trim')}
        </div>
      )
    },
    {
      type: 'submenu',
      key: 'effects',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Icon value="magic" options={{ width: 16, height: 16 }} />
          {t('image-thumbnails.editor.transformations.effects')}
        </div>
      ),
      children: [
        {
          key: 'effects:sepia',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon value="eye-dropper" options={{ width: 16, height: 16 }} />
              {t('image-thumbnails.editor.transformations.effects.sepia')}
            </div>
          )
        },
        {
          key: 'effects:grayscale',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon value="adjust" options={{ width: 16, height: 16 }} />
              {t('image-thumbnails.editor.transformations.effects.grayscale')}
            </div>
          )
        },
        {
          key: 'effects:sharpen',
          label: (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon value="focus" options={{ width: 16, height: 16 }} />
              {t('image-thumbnails.editor.transformations.effects.sharpen')}
            </div>
          )
        }
      ]
    }
  ]

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick
      }}
      trigger={['click']}
      placement="bottomLeft"
    >
      <Button 
        type="primary" 
        icon={<Icon value="plus" />}
        size="small"
      >
        {t('image-thumbnails.editor.transformations')}
      </Button>
    </Dropdown>
  )
}