/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Menu } from 'antd'
import { type MenuDividerType } from '../../../dropdown'
import React from 'react'

export const DividerItem = (props: MenuDividerType): React.JSX.Element => {
  return (
    <Menu.Divider { ...props } />
  )
}
