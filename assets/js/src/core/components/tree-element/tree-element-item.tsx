/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { Dropdown, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Icon } from '@Pimcore/components/icon/icon'

export interface ITreeElementItemProps {
  title: string
  actions?: Array<{ key: string, icon: string }>
  onSelected?: () => void
  onActionsClick?: (action: string, title: string) => void
}
const TreeElementItem = ({ title, actions, onSelected, onActionsClick }: ITreeElementItemProps): React.JSX.Element => {
  const { t } = useTranslation()

  const items: MenuProps['items'] = []

  actions?.forEach((action) => {
    items?.push({
      key: action.key,
      label: t(`tree.actions.${action.key}`),
      icon: <Icon value={ action.icon } />,
      onClick: () => {
        onActionsClick?.(action.key, title)
      }
    })
  })

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
