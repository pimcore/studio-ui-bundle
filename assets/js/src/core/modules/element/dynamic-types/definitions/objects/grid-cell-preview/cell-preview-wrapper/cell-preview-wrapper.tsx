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
import { theme } from 'antd'

interface GridPreviewWrapperProps {
  children: React.ReactNode
}

const GridPreviewWrapper: React.FC<GridPreviewWrapperProps> = ({ children }) => {
  const { useToken } = theme
  const { token } = useToken()
  const padding = token.sizeXS

  return (
    <div style={ { padding } }>
      {children}
    </div>
  )
}

export default GridPreviewWrapper
