/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Card } from '@Pimcore/components/card/card'
import { Flex } from '@sdk/components'
import React from 'react'
import { type ExtendedWidgetConfig, WidgetConfiguratorProvider } from '../../context/widget-configurator-provider'
import { AddWidgetDropdown } from '../add-widget-dropdown/add-widget-dropdown'
import { StackedWidgetList } from '../stacked-widget-list/stacked-widget-list'

interface WidgetConfigurationCardProps {
  'data-testid'?: string
  label: string
  allowExpandControl?: boolean
  value?: ExtendedWidgetConfig
  onChange?: (value: any) => void
}

export const WidgetConfigurationCard = ({ label, value, onChange, allowExpandControl = true, 'data-testid': testId }: WidgetConfigurationCardProps): React.JSX.Element => {
  return (
    <WidgetConfiguratorProvider
      formChange={ onChange }
      value={ value }
    >
      <Card
        className="w-full"
        data-testid={ testId }
        title={
          <Flex
            align="center"
            gap={ 8 }
          >
            <span>{label}</span>
            <AddWidgetDropdown />
          </Flex>
        }
      >
        <StackedWidgetList
          allowExpandControl={ allowExpandControl }
        />
      </Card>
    </WidgetConfiguratorProvider>
  )
}
