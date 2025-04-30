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
