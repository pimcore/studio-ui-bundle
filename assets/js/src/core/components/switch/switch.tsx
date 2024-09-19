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
import type { SwitchProps as AntdSwitchProps } from 'antd/es/switch/index'
import { Switch as AntdSwitch } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'

export interface SwitchProps extends AntdSwitchProps {
  tag: string
  tagPosition: TagPosition
}

export type TagPosition = 'start' | 'end'

export const Switch = ({
  tag,
  tagPosition,
  ...props
}: SwitchProps): React.JSX.Element => {
  return (
    <Flex
      align={ 'center' }
      gap={ 'extra-small' }
    >
      {tagPosition === 'start' && <p>{tag}</p>}
      <AntdSwitch
        { ...props }
      />
      {tagPosition === 'end' && <p>{tag}</p>}
    </Flex>
  )
}
