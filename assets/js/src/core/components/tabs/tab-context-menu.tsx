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
import { Menu } from '@Pimcore/components/menu/menu'
import { useCloseContextMenu } from '@Pimcore/components/context-menu-wrapper/context-menu-wrapper'

export interface TabContextMenuProps {
  tabKey: string
  allKeys: string[]
  onClose: (key: string) => void
}

export const TabContextMenu = ({ tabKey, allKeys, onClose }: TabContextMenuProps): React.JSX.Element => {
  const { t } = useTranslation()
  const closeMenu = useCloseContextMenu()

  return (
    <Menu
      items={ [
        {
          key: 'close-tab',
          label: t('close-tab'),
          onClick: () => {
            onClose(tabKey)
            closeMenu?.()
          }
        },
        {
          key: 'close-others',
          label: t('close-others'),
          onClick: () => {
            allKeys.forEach((k) => {
              if (k !== tabKey) {
                onClose(k)
              }
            })
            closeMenu?.()
          }
        },
        {
          key: 'close-all',
          label: t('close-all'),
          onClick: () => {
            allKeys.forEach((k) => { onClose(k) })
            closeMenu?.()
          }
        }
      ] }
    />
  )
}
