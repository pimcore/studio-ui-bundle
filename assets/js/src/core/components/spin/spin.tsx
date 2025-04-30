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
import { Spin as AntdSpin, type SpinProps as AntdSpinProps } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Icon } from '../icon/icon'
import { useStyles } from './spin.styles'

interface SpinProps extends Omit<AntdSpinProps, 'indicator'> {
  type?: 'dotted' | 'classic'
  asContainer?: boolean
};

export const Spin = ({ asContainer = false, type = 'dotted', tip, ...props }: SpinProps): React.JSX.Element => {
  const { styles } = useStyles()

  let icon = (
    <Icon
      className={ styles.spin }
      value='spinner'
    />
  )

  if (type === 'classic') {
    icon = (
      <LoadingOutlined spin />
    )
  }

  return (
    <>
      { !asContainer && (
        <>
          {icon}
        </>
      )}

      { asContainer && (
        <div className={ styles.spinContainer }>
          <AntdSpin
            indicator={ <>
              {icon}
            </> }
            { ...props }
          />

          { tip !== undefined && (
            <div>
              {tip}
            </div>
          )}
        </div>
      )}
    </>
  )
}
