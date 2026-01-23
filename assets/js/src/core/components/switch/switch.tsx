/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import type { SwitchProps as AntdSwitchProps } from 'antd/es/switch/index'
import { Switch as AntdSwitch } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useStyles } from './switch.styles'
import { isNil } from 'lodash'

export interface SwitchProps extends AntdSwitchProps {
  labelLeft?: ReactNode
  labelRight?: ReactNode
  tooltip?: ReactNode
}

export const Switch = ({
  labelLeft,
  labelRight,
  tooltip,
  ...props
}: SwitchProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      align={ 'center' }
      gap={ 'extra-small' }
    >
      {labelLeft}
      <AntdSwitch
        { ...props }
      />
      {labelRight}
      {!isNil(tooltip) && (
        <Tooltip
          placement="right"
          title={ tooltip }
        >
          <QuestionCircleOutlined className={ styles.tooltipIcon } />
        </Tooltip>
      )}
    </Flex>
  )
}
