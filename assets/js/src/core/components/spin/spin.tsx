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
import { Spin as AntdSpin, type SpinProps as AntdSpinProps } from 'antd'
import { Icon } from '../icon/icon'
import { useStyles } from './spin.styles'

interface SpinProps extends AntdSpinProps {};

export const Spin = ({ ...props }: SpinProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <AntdSpin
      indicator={ <Icon
        className={ styles.spin }
        name='spinner'
                  /> }
      { ...props }
    />
  )
}
