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

import type { DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { type TabNode } from 'flexlayout-react'
import { container } from '@Pimcore/app/depency-injection'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services'

export const createContextMenu = ({ dropdownPosition, closeContextMenu, model, closeWidget }): DropdownProps['menu']['items'] => {
  return [
    {
      key: 'close-tab',
      label: 'Close Tab',
      onClick: () => {
        if (dropdownPosition !== null) {
          closeWidget(dropdownPosition.tabNode.getId() as string)
          closeContextMenu()
        }
      }
    },
    {
      key: 'close-others',
      label: 'Close Others',
      onClick: () => {
        if (dropdownPosition !== null) {
          model.getActiveTabset()?.getChildren().forEach((tabNode: TabNode) => {
            if (tabNode.getId() !== dropdownPosition.tabNode.getId()) {
              closeWidget(tabNode.getId())
            }
          })
          closeContextMenu()
        }
      }
    },
    {
      key: 'close-unmodified',
      label: 'Close Unmodified',
      onClick: () => {
        if (dropdownPosition !== null) {
          const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

          model.getActiveTabset()?.getChildren().forEach((tabNode: TabNode) => {
            const component = widgetRegistryService.getWidget(tabNode.getComponent() ?? '')
            const isModified = component?.isModified
            if (isModified !== undefined && isModified(tabNode)) {
              return
            }

            closeWidget(tabNode.getId())
          })
          closeContextMenu()
        }
      }
    },
    {
      key: 'close-all',
      label: 'Close All',
      onClick: () => {
        if (dropdownPosition !== null) {
          model.getActiveTabset()?.getChildren().forEach((tabNode: TabNode) => {
            closeWidget(tabNode.getId())
          })
          closeContextMenu()
        }
      }
    }
  ]
}
