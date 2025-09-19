/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { StackList } from '@Pimcore/components/stack-list/stack-list'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import React, { useEffect, useState } from 'react'
import { useWidgetConfiguratorContext } from '../../context/hooks/use-widget-configurator-context'
import { WidgetConfigurationCardItem } from '../widget-configuration-card-item/widget-configuration-card-item'
import { RightToolbar } from './components/right-toolbar/right-toolbar'

interface StackedWidgetListProps {
  allowExpandControl?: boolean
}

export const StackedWidgetList = ({ allowExpandControl = true }: StackedWidgetListProps): React.JSX.Element => {
  const [parsedValues, setParsedValues] = useState<StackListItemProps[]>([])
  const { onReorder, widgetConfigs } = useWidgetConfiguratorContext()

  useEffect(() => {
    setParsedValues(widgetConfigs.map((value, index) => {
      return {
        id: value.id,
        sortable: true,
        renderRightToolbar: <RightToolbar widget={value} allowExpandControl={allowExpandControl} />,
        children: <WidgetConfigurationCardItem
          widget={value}
        />
      }
    }))
  }, [widgetConfigs])

  return (
    <StackList
      items={parsedValues}
      onItemsChange={onReorder}
      sortable
    />
  )
}
