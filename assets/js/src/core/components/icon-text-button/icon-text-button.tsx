/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Button, type ButtonProps } from '../button/button'
import React from 'react'
import { Icon, type IconProps } from '../icon/icon'
import { Flex } from 'antd'

export interface IconTextButtonProps extends Omit<ButtonProps, 'icon'> {
  icon: IconProps
  iconOptions?: IconProps['options']
  iconPlacement?: 'left' | 'right'
}

export const IconTextButton = ({ icon, children, iconOptions, iconPlacement = 'left', ...buttonProps }: IconTextButtonProps): React.JSX.Element => {
  return (
    <Button
      { ...buttonProps }
    >
      <Flex
        align='center'
        gap={ 6 }
        justify='center'
      >
        { iconPlacement === 'left' && (
          <Icon { ...icon } />
        ) }

        <span>
          { children }
        </span>

        { iconPlacement === 'right' && (
          <Icon { ...icon } />
        ) }
      </Flex>
    </Button>
  )
}
