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
