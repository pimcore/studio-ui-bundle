/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { ButtonGroup } from '../button-group/button-group'
import { Dropdown, type DropdownProps } from '../dropdown/dropdown'
import { IconButton } from '../icon-button/icon-button'
import { IconTextButton, type IconTextButtonProps } from '../icon-text-button/icon-text-button'
import { useStyle } from './split-button.styles'

export interface SplitButtonProps extends IconTextButtonProps {
  menu: DropdownProps['menu']
  // The toggle is icon-only, so it needs its own translated accessible name.
  menuAriaLabel: string
  menuDisabled?: boolean
  dropdownProps?: Omit<DropdownProps, 'menu' | 'children'>
}

export const SplitButton = ({
  menu,
  menuAriaLabel,
  menuDisabled = false,
  dropdownProps,
  ...buttonProps
}: SplitButtonProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { color, danger, size, type = 'default' } = buttonProps
  const isMenuDisabled = menuDisabled || buttonProps.disabled === true || dropdownProps?.disabled === true

  const items: ReactElement[] = [
    <IconTextButton
      key="action"
      { ...buttonProps }
      type={ type }
    />,

    <Dropdown
      key="menu"
      menu={ menu }
      { ...dropdownProps }
      disabled={ isMenuDisabled }
    >
      <IconButton
        aria-label={ menuAriaLabel }
        className={ styles.toggle }
        color={ color }
        danger={ danger }
        disabled={ isMenuDisabled }
        icon={ { value: 'chevron-down' } }
        size={ size }
        type={ type }
      />
    </Dropdown>
  ]

  return (
    <ButtonGroup
      items={ items }
      noSpacing
    />
  )
}
