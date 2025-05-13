/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Space as AntSpace, type SpaceProps as AntSpaceProps } from 'antd'
import React from 'react'
import { useStyles } from './space.styles'

export interface SpaceProps extends Omit<AntSpaceProps, 'size' | 'classNames'> {
  size?: 'none' | 'mini' | 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large' | 'maxi'
}

export const Space = ({ size = 'small', className, ...props }: SpaceProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [styles.space, className]
  classes.push(`space--sizing-${size}`)

  return (
    <AntSpace
      className={ classes.join(' ') }
      { ...props }
    />
  )
}
