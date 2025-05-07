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
import { Space, type SpaceProps } from '../space/space'
import { Divider } from 'antd'
import { useStyles } from '@Pimcore/components/split/split.styles'

export interface SplitProps extends Omit<SpaceProps, 'split'> {
  theme?: 'primary' | 'secondary'
  dividerSize?: 'small' | 'large'
}

export const Split = ({ theme = 'primary', dividerSize = 'large', ...props }: SplitProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = [
    styles.split,
    'split--theme-' + theme,
    'split--divider-size-' + dividerSize
  ].join(' ')

  return (
    <Space
      className={ classes }
      split={ <Divider type="vertical" /> }
      { ...props }
    />
  )
}
