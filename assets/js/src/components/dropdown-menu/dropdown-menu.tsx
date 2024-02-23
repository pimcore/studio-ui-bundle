import {Dropdown, DropdownProps, MenuProps} from 'antd'
import React, { ReactElement } from 'react'



interface DropdownMenuProps extends React.PropsWithChildren {
    children: ReactElement,
    placement: DropdownProps['placement'],
    items: MenuProps['items'],
    openClassName?: string,
}

export const DropdownMenu = ({
      children,
      placement, 
      items,
      openClassName,
    }: DropdownMenuProps
  ): React.JSX.Element => {
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
