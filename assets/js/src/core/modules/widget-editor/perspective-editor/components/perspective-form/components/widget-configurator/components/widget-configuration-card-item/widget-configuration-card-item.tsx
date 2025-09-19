/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { type WidgetConfig } from '@Pimcore/modules/perspectives/perspectives-slice.enhanced'
import { isNil } from 'lodash'
import React from 'react'

interface WidgetConfigurationCardItemProps {
  widget?: WidgetConfig
}

export const WidgetConfigurationCardItem = ({ widget }: WidgetConfigurationCardItemProps): React.JSX.Element => {
  if (isNil(widget)) {
    return <></>
  }

  return (
    <Flex
      align="center"
      gap={ 8 }
    >
      <Icon { ...widget.icon } />
      <span>{widget.name}</span>
    </Flex>
  )
}
