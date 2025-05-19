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
import { Dropdown } from 'antd'

export interface ContextMenuWrapperProps {
  children: React.ReactNode
  renderMenu: () => ReactElement
}

const ContextMenuWrapper = ({ children, renderMenu }: ContextMenuWrapperProps): React.JSX.Element => {
  return (
    <Dropdown
      dropdownRender={ () => renderMenu() }
      trigger={ ['contextMenu'] }
    >
      <span>{children}</span>
    </Dropdown>
  )
}

export default ContextMenuWrapper
