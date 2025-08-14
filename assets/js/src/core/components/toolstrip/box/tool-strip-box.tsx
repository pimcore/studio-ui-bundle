/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box, type BoxProps } from '@Pimcore/components/box/box'
import React from 'react'
import { Flex } from 'antd'
import { useStyles } from './tool-strip-box.styles'
import cn from 'classnames'

export interface ToolStripBoxProps extends BoxProps {
  renderToolStripStart?: React.ReactNode
  renderToolStripEnd?: React.ReactNode
  docked?: boolean
}

export const ToolStripBox = ({ className, docked = false, children, renderToolStripEnd, renderToolStripStart, padding = { x: 'extra-small', y: 'small' }, ...props }: ToolStripBoxProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classNames = cn(
    className,
    'tool-strip-box',
    styles['tool-strip-box'],
    {
      'tool-strip-box--with-start': renderToolStripStart !== undefined,
      'tool-strip-box--with-end': renderToolStripEnd !== undefined,
      'tool-strip-box--docked': docked
    }
  )

  return (
    <div className={ classNames }>
      <Flex
        align="flex-end"
        justify="space-between"
      >
        {renderToolStripStart !== undefined
          ? (
            <div className="tool-strip-box__strip--start">
              {renderToolStripStart}
            </div>
            )
          : <div />}
        {renderToolStripEnd !== undefined
          ? (
            <div className="tool-strip-box__strip--end">
              {renderToolStripEnd}
            </div>
            )
          : <div />}
      </Flex>

      <Box
        className="tool-strip-box__content"
        padding={ padding }
        { ...props }
      >
        {children}
      </Box>
    </div>
  )
}
