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
import { TooltipIcon, type TooltipIconProps } from '@Pimcore/components/tooltip-icon/tooltip-icon'
import { isNil } from 'lodash'

export interface SwitchProps extends AntdSwitchProps {
  labelLeft?: ReactNode
  labelRight?: ReactNode
  tooltip?: ReactNode
  tooltipPlacement?: TooltipIconProps['placement']
}

export const Switch = ({
  labelLeft,
  labelRight,
  tooltip,
  tooltipPlacement = 'right',
  ...props
}: SwitchProps): React.JSX.Element => {
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
        <TooltipIcon
          placement={ tooltipPlacement }
          tooltip={ tooltip }
        />
      )}
    </Flex>
  )
}
