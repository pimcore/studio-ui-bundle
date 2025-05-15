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
import { IconTextButton, type IconTextButtonProps } from '../icon-text-button/icon-text-button'
import { type IconProps } from '@Pimcore/components/icon/icon'
import { useStyle } from './dropdown-button.styles'

export type dropdownButtonProps = Omit<IconTextButtonProps, 'icon'> & {
  icon?: IconProps
}

export const DropdownButton = ({ icon, ...props }: dropdownButtonProps): React.JSX.Element => {
  const { styles } = useStyle()

  props.className = props.className !== null ? `${props.className} ${styles.dropdownButton}` : `${styles.dropdownButton}`
  return (
    <IconTextButton
      icon={ {
        value: 'chevron-down',
        ...icon
      } }
      iconPlacement="right"
      type="link"
      { ...props }
    />
  )
}
