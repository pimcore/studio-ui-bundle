import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import React, { type ReactElement } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './dropdown-menu.styles'

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
                    <MenuItemContent item={item} />
        )
      }
    )
  })

  return (
    <Dropdown menu={{ items }}
              placement={placement}
              openClassName={openClassName}
        >
        {children}
    </Dropdown>
  )
}

function MenuItemContent (prop): React.JSX.Element {
  const { item } = prop
  const { styles } = useStyle()
  const iconOptions = { width: '16px', height: '16px' }

  const iconLeft = <Icon name={item.iconLeft} options={iconOptions} className={styles['menu-icon']} />
  if (item.iconRight !== null && item.iconRight !== undefined) {
    return (
            <div onClick={item.onClick}
                 className={styles['flexbox-start-end']}
            >
                <div>
                    {iconLeft}
                    <span className={styles['label']}>{item.label}</span>
                    {
                        (item.iconToLabel as boolean ?? false) && <IconWithProps iconProps={
                            { ...item.iconToLabel, width: '12px', height: '12px' }
                        } />
                    }
                </div>
                <div onClick={item.iconRight.onClick}>
                    <IconWithProps iconProps={item.iconRight} />
                </div>
            </div>

    )
  }

  return (
        <div onClick={item.onClick}>
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

  return <Icon name={iconProps.name} options={iconOptions}
          className={styles['menu-icon'] + ' ' + (iconProps.className ?? '')}/>
}
