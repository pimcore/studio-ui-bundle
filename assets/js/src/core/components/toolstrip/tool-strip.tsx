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
import { useStyles } from './tool-strip.styles'
import cn from 'classnames'
import { Box } from '../box/box'
import { ThemeProvider } from 'antd-style'

export interface ToolStripProps {
  className?: string
  children: React.ReactNode
  theme?: 'default' | 'inverse'
}

export const ToolStrip = ({ children, className, theme: toolStripTheme = 'default' }: ToolStripProps): React.JSX.Element => {
  const {styles, theme: token} = useStyles()


  const classNames = cn(
    'tool-strip',
    styles['tool-strip'],
    `tool-strip--theme-${toolStripTheme}`,
    className
  )

  const themeConfig = toolStripTheme === 'inverse' ? {
    components: {
      Button: {
        colorLink: token.colorButtonInverse,
        colorLinkHover: token.colorButtonInverse,
        colorLinkActive: token.colorButtonInverse,
        colorTextDisabled: token.colorInactiveInverse, 
      },
      Typography: {
        colorText: token.colorTextInverse,
      },
      Split: {
        colorFillSecondary: token.colorDividerInverse,
      }
    }
  } : {}

  return (
    <ThemeProvider theme={themeConfig}>
      <Box
        className={ classNames }
        padding={ { x: 'mini', y: 'mini', left: 'extra-small' } }
      >
        {children}
      </Box>
    </ThemeProvider>
  )
}
