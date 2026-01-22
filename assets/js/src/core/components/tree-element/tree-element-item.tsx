/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Dropdown, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'
import { type TreeAction } from '@sdk/components'

export interface ITreeElementItemProps {
  title: string
  actions?: TreeAction[]
  onSelected?: () => void
  onActionsClick?: (action: string, title: string) => void
}
const TreeElementItem = ({ title, actions, onSelected, onActionsClick }: ITreeElementItemProps): React.JSX.Element => {
  const { t } = useTranslation()

  const items: MenuProps['items'] = useMemo(() => {
    const menuItems: MenuProps['items'] = []

    // handle nested actions
    const buildMenuItems = (actionsList: TreeAction[]): MenuProps['items'] => {
      return actionsList.map((action) => {
        if (action.actions !== undefined && action.actions.length > 0) {
          return {
            key: action.key,
            label: t(`tree.actions.${action.key}`),
            icon: <Icon value={ action.icon } />,
            children: buildMenuItems(action.actions)
          }
        } else {
          return {
            key: action.key,
            label: t(`tree.actions.${action.key}`),
            icon: <Icon value={ action.icon } iconColorGroup={ action.iconColorGroup } />,
            onClick: () => {
              onActionsClick?.(action.key, title)
            }
          }
        }
      })
    }

    if (actions !== undefined && actions.length > 0) {
      menuItems.push(...(buildMenuItems(actions) ?? []))
    }

    return menuItems
  }, [actions])

  const renderTitle = (): React.JSX.Element => (
    <button
      className={ 'ant-tree-title__btn' }
      onClick={ onSelected }
      onKeyDown={ (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
          if (onSelected != null) {
            onSelected()
          }
        }
      } }
    >
      {title}
    </button>
  )

  return items?.length > 0
    ? (
      <Dropdown
        menu={ { items } }
        trigger={ ['contextMenu'] }
      >
        {renderTitle()}
      </Dropdown>
      )
    : renderTitle()
}

export { TreeElementItem }
