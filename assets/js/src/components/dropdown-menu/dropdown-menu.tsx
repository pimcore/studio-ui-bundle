import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import React, { type ReactElement } from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './dropdown-menu.styles'

export interface DropdownMenuItemProps {
  iconNameLeft: string
  label: string
  onClick?: () => void
  iconNameRight?: string
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

  dropdownItems.forEach((item, index) => {
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
      <div>
        <Dropdown menu={{ items }}
                  placement={placement}
                  openClassName={openClassName}
            >
            {children}
        </Dropdown>
      </div>
  )
}

function MenuItemContent (prop): React.JSX.Element {
  const { item } = prop
  const { styles } = useStyle()
  const iconOptions = { width: '16px', height: '16px' }

  if (item.iconNameRight as boolean) {
    return (
            <div onClick={item.onClick}
                 className={styles['flexbox-start-end']}
            >
                <div>
                    <Icon name={item.iconNameLeft} options={iconOptions} className={styles['menu-icon']}/>
                    {item.label}
                </div>
                <div>
                    <Icon name={item.iconNameRight} options={iconOptions} className={styles['menu-icon']}/>
                </div>
            </div>

    )
  }

  return (
        <div onClick={item.onClick}>
            <Icon name={item.iconNameLeft} options={iconOptions} className={styles['menu-icon']} />
            {item.label}
        </div>
  )
}
