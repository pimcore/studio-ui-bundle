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

  const menuHasAnyIconRight = dropdownItems.find((item: DropdownMenuItemProps): boolean =>
    item.iconRight !== null && item.iconRight !== undefined
  ) !== undefined

  dropdownItems.forEach((item: DropdownMenuItemProps, index: number): void => {
    items.push(
      {
        key: index.toString(),
        label: (
          <MenuItemContent
            index={ index }
            item={ item }
            menuHasAnyIconRight={ menuHasAnyIconRight }
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
  const { item, index, menuHasAnyIconRight } = prop
  const { styles } = useStyle()
  const iconOptions = { width: '16px', height: '16px' }

  const iconLeft = (
    <Icon
      className={ styles['menu-icon-left'] }
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
        <div className={ styles['left-area'] }>
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
      className={ styles.flexbox + ' ' + styles['left-area'] }
      onClick={ item.onClick }
      onKeyDown={ onKeyEnterExecuteClick }
      role={ 'menuitem' }
      tabIndex={ index }
    >
      {iconLeft}
      {item.label}
      {menuHasAnyIconRight as boolean && <div className={ styles['icon-placeholder'] } /> }
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
