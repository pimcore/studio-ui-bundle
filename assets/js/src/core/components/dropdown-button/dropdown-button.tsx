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
import { IconTextButton, type IconTextButtonProps } from '../icon-text-button/icon-text-button'

export type dropdownButtonProps = Omit<IconTextButtonProps, 'icon'> & {
  icon?: string
}

export const DropdownButton = ({ icon = 'icon-tools', ...props }: dropdownButtonProps): React.JSX.Element => {
  return (
    <IconTextButton
      icon={ icon }
      iconPlacement="right"
      type="link"
      { ...props }
    />
  )
}
