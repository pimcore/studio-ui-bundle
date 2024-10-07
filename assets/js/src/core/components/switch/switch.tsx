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
import type { SwitchProps as AntdSwitchProps } from 'antd/es/switch/index'
import { Switch as AntdSwitch } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'

export interface SwitchProps extends AntdSwitchProps {
  labelLeft?: ReactNode
  labelRight?: ReactNode
}

export const Switch = ({
  labelLeft,
  labelRight,
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
    </Flex>
  )
}
