/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { StackList } from '@Pimcore/components/stack-list/stack-list'
import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import React, { useEffect, useState } from 'react'
import { WidgetConfigurationCardItem } from '../widget-configuration-card-item/widget-configuration-card-item'
import { useWidgetConfiguratorContext } from '../../context/hooks/use-widget-configurator-context'
import { type WidgetConfig } from '@sdk/api/perspectives'

interface StackedWidgetListProps {
  allowExpandControl?: boolean
}

export const StackedWidgetList = ({ allowExpandControl = true }: StackedWidgetListProps): React.JSX.Element => {
  const [parsedValues, setParsedValues] = useState<StackListItemProps[]>([])
  const { onReorder, widgetConfigs, onRemove } = useWidgetConfiguratorContext()

  const RightToolbar = ({ widget }: { widget: WidgetConfig }): React.JSX.Element => {
    const { expandedWidget, setExpanded } = useWidgetConfiguratorContext()
    const isExpanded = expandedWidget === widget.id

    let items = [
      <IconButton
        icon={ { value: 'trash' } }
        key={ 'remove' }
        onClick={ () => { onRemove(widget.id) } }
        theme="secondary"
      />
    ]

    if (allowExpandControl) {
      items = [
        <IconButton
          icon={ { value: isExpanded ? 'eye' : 'eye-off' } }
          key={ 'expand' }
          onClick={ () => { setExpanded(widget.id) } }
          theme="secondary"
        />,
        ...items
      ]
    }

    return (
      <ButtonGroup
        items={ items }
        noSpacing
      />
    )
  }

  useEffect(() => {
    setParsedValues(widgetConfigs.map((value, index) => {
      return {
        id: value.id,
        sortable: true,
        renderRightToolbar: <RightToolbar widget={ value } />,
        children: <WidgetConfigurationCardItem
          widget={ value }
                  />
      }
    }))
  }, [widgetConfigs])

  return (
    <StackList
      items={ parsedValues }
      onItemsChange={ onReorder }
      sortable
    />
  )
}
