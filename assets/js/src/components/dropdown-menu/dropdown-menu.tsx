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

import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import React, { type ReactElement } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './dropdown-menu.styles'
import { onKeyEnterExecuteClick } from '@Pimcore/utils/helpers'

export interface DropdownMenuItemProps {
  iconLeft: string
  label: string
  onClick?: (e: any) => void
  iconToLabel?: IconProps
  iconRight?: IconProps
}

export interface IconProps {
  name: string
  className?: string
  onClick?: (e: any) => void
}

interface DropdownMenuProps extends React.PropsWithChildren {
  children: ReactElement
  placement: DropdownProps['placement']
  dropdownItems: DropdownMenuItemProps[]
  openClassName?: string
}

export const DropdownMenu = ({
  children,
  placement,
  dropdownItems,
  openClassName
}: DropdownMenuProps
): React.JSX.Element => {
  const items: MenuProps['items'] = []

  dropdownItems.forEach((item: DropdownMenuItemProps, index: number): void => {
    items.push(
      {
        key: index.toString(),
        label: (
          <MenuItemContent
            index={ index }
            item={ item }
          />
        )
      }
    )
  })

  return (
    <Dropdown
      menu={ { items } }
      openClassName={ openClassName }
      placement={ placement }
    >
      {children}
    </Dropdown>
  )
}

function MenuItemContent (prop): React.JSX.Element {
  const { item } = prop
  const { index } = prop
  const { styles } = useStyle()
  const iconOptions = { width: '16px', height: '16px' }

  const iconLeft = (
    <Icon
      className={ styles['menu-icon'] }
      name={ item.iconLeft }
      options={ iconOptions }
    />
  )
  if (item.iconRight !== null && item.iconRight !== undefined) {
    return (
      <div
        className={ styles['flexbox-start-end'] }
        onClick={ item.onClick }
        onKeyDown={ onKeyEnterExecuteClick }
        role={ 'menuitem' }
        tabIndex={ index * 2 }
      >
        <div>
          {iconLeft}
          <span className={ styles.label }>{item.label}</span>
          {
            (item.iconToLabel as boolean ?? false) && (
              <IconWithProps iconProps={
                  { ...item.iconToLabel, width: '12px', height: '12px' }
                }
              />
            )
          }
        </div>
        <div
          onClick={ item.iconRight.onClick }
          onKeyDown={ onKeyEnterExecuteClick }
          role={ 'menuitem' }
          tabIndex={ index + 1 }
        >
          <IconWithProps iconProps={ item.iconRight } />
        </div>
      </div>

    )
  }

  return (
    <div
      onClick={ item.onClick }
      onKeyDown={ onKeyEnterExecuteClick }
      role={ 'menuitem' }
      tabIndex={ index }
    >
      {iconLeft}
      {item.label}
    </div>
  )
}

function IconWithProps (prop): React.JSX.Element {
  const { iconProps } = prop
  const { styles } = useStyle()
  const iconOptions = {
    width: iconProps.width ?? '16px',
    height: iconProps.height ?? '16px'
  }

  return (
    <Icon
      className={ styles['menu-icon'] + ' ' + (iconProps.className ?? '') }
      name={ iconProps.name }
      options={ iconOptions }
    />
  )
}
