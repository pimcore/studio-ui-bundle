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

import React, { type ReactNode } from 'react'
import cn from 'classnames'
import { useStyles } from './content.styles'
import { type INoContentProps, NoContent } from '../no-content/no-content'
import { Spin } from '../spin/spin'
import { Box, type BoxProps } from '../box/box'

export interface ContentProps extends Omit<BoxProps, 'children'> {
  className?: string
  children?: ReactNode
  padded?: boolean
  loading?: boolean
  none?: boolean
  centered?: boolean
  fullPage?: boolean
  noneOptions?: INoContentProps
}

export const Content = ({
  children,
  padded = false,
  padding = { top: 'small', x: 'extra-small', bottom: 'extra-small' },
  margin = 'none',
  className,
  loading = false,
  none = false,
  centered = false,
  noneOptions,
  fullPage,
  ...props
}: ContentProps): React.JSX.Element => {
  const { styles } = useStyles()

  const showChildren = !loading && !none
  const contentCentered = centered || none || loading

  const classes = cn(
    styles.content,
    'content',
    className,
    {
      'content--centered': contentCentered,
      [styles.contentFullPage]: fullPage
    }
  )

  return (
    <Box
      className={ classes }
      padding={ padded ? padding : 'none' }
      { ...props }
    >
      {loading && (
        <Spin
          asContainer
          tip='Loading'
        />
      )}

      {none && !loading && (
        <NoContent { ...noneOptions } />
      )}

      {showChildren && children}
    </Box>
  )
}
