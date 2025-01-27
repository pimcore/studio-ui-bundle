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
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'

export interface CalculatedValueLabelProps {
  label: ReactNode
}

export const CalculatedValueLabel = (props: CalculatedValueLabelProps): React.JSX.Element => {
  return (
    <Flex
      align="center"
      gap="extra-small"
    >
      <Icon value={ 'calculator' } />
      <span>{props.label}</span>
    </Flex>
  )
}
