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

import { Divider } from 'antd'
import React from 'react'
import { useStlyes } from './main-nav.styles'
import { Icon } from '@Pimcore/components/icon/icon'
import { useMainNav } from './hooks/use-main-nav'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import type { IMainNavItem } from '@Pimcore/modules/app/nav/main-nav-slice'

interface IMainNavProps {
  onNavItemClick: () => void
}

export const MainNav = ({ onNavItemClick, ...props }: IMainNavProps): React.JSX.Element => {
  const { styles } = useStlyes()
  const { getNavItems } = useMainNav()
  const { openMainWidget } = useWidgetManager()

  const [openKeys, setOpenKeys] = React.useState<string[]>([])
  const handleOpenState = (key: string): void => {
    if (key.includes('-')) {
      const searchKey = key.substring(0, key.length - 1)
      const newOpenKeys = openKeys.filter(k => !k.startsWith(searchKey))
      setOpenKeys([...newOpenKeys, key])
    } else {
      if (openKeys.find(k => k === key) !== undefined) {
        setOpenKeys(openKeys.filter(k => k !== key))
      } else {
        setOpenKeys([key])
      }
    }
  }

  const renderNavItem = (item: IMainNavItem, index: string): React.JSX.Element => {
    return (
      <li
        className={ `main-nav__list-item ${openKeys.includes(index) ? 'is-active' : ''}` }
        key={ item.id }
      >
        <button
          className={ 'main-nav__list-btn' }
          onClick={ () => {
            if (item.children !== undefined && item.children.length > 0) {
              handleOpenState(index)
            } else {
              if (item.widgetConfig !== undefined) {
                openMainWidget(item.widgetConfig)
                onNavItemClick()
              }
              // if (item.onClick !== undefined) {
              //   item.onClick()
              // }
            }
          } }
        >
          {item.icon !== undefined ? (<Icon value={ item.icon } />) : null}
          {item.label}

          {item.children !== undefined && item.children.length > 0
            ? (
              <Icon
                className={ 'main-nav__list-btn-icon' }
                value={ 'chevron-right' }
              />
              )
            : null}
        </button>

        {item.children !== undefined && item.children.length > 0
          ? (
            <ul className={ `main-nav__list main-nav__list--level-${parseInt(index) + 1}` }>
              {item.children?.map((child: IMainNavItem, childIndex) => renderNavItem(child, `${index}-${childIndex}`))}
            </ul>
            )
          : null}
      </li>
    )
  }

  return (
    <div className={ ['main-nav', styles.mainNav].join(' ') }>
      <div className={ 'main-nav__top' }>
        <ul className={ 'main-nav__list-inline' }>
          <li>
            <IconTextButton
              icon={ { value: 'pin-02-outlined' } }
              type={ 'link' }
            >Document Types</IconTextButton></li>
          <li><Button type={ 'link' }>Clear Full Page Cache</Button></li>
          <li><Button type={ 'link' }>Custom Reports</Button></li>
        </ul>
        <Button type={ 'default' }>Customise</Button>
      </div>

      <Divider className={ 'main-nav__divider' } />

      <ul className={ 'main-nav__list main-nav__list--level-0' }>
        {getNavItems.map((item, index) => (
          renderNavItem(item, `${index}`)
        ))}
      </ul>

      <Divider className={ 'main-nav__divider' } />

      <div className={ 'main-nav__bottom' }>
        Perspectives
        <ul className={ 'main-nav__list-inline' }>
          <li><IconTextButton
            icon={ { value: 'pin-02-outlined' } }
            type={ 'default' }
              >Default</IconTextButton></li>
        </ul>
      </div>
    </div>
  )
}
