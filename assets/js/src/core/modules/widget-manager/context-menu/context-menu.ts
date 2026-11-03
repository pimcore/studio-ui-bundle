/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { type TabNode } from 'flexlayout-react'
import { isUndefined } from 'lodash'
import { container } from '@Pimcore/app/depency-injection'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type CreateContextMenuItemsProps } from '@Pimcore/modules/widget-manager/hooks/use-context-menu'
import { store } from '@Pimcore/app/store'
import { t } from 'i18next'
import { expandMainWidget } from '../widget-manager-slice'
import { canExpandMainWidgetTabset } from '../utils/expand-main-widget-tabset'

const createExpandItems = ({ contextMenuState, closeContextMenu, model }: CreateContextMenuItemsProps): NonNullable<DropdownProps['menu']['items']> => {
  const nodeId = contextMenuState?.tabNode.getId()

  if (isUndefined(nodeId) || !canExpandMainWidgetTabset(model, nodeId)) {
    return []
  }

  return [
    { type: 'divider', key: 'use-full-space-divider' },
    {
      key: 'use-full-space',
      label: t('use-full-space'),
      onClick: () => {
        store.dispatch(expandMainWidget(nodeId))
        closeContextMenu()
      }
    }
  ]
}

export const createContextMenuItems = (props: CreateContextMenuItemsProps): DropdownProps['menu']['items'] => {
  const { contextMenuState, closeContextMenu, model, closeWidget } = props

  return [
    {
      key: 'close-tab',
      label: t('close-tab'),
      onClick: () => {
        if (contextMenuState !== null) {
          closeWidget(contextMenuState.tabNode.getId())
          closeContextMenu()
        }
      }
    },
    {
      key: 'close-others',
      label: t('close-others'),
      onClick: () => {
        if (contextMenuState !== null) {
          model.getActiveTabset()?.getChildren().forEach((tabNode: TabNode) => {
            if (tabNode.getId() !== contextMenuState.tabNode.getId()) {
              closeWidget(tabNode.getId())
            }
          })
          closeContextMenu()
        }
      }
    },
    {
      key: 'close-unmodified',
      label: t('close-unmodified'),
      onClick: () => {
        if (contextMenuState !== null) {
          const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

          model.getActiveTabset()?.getChildren().forEach((tabNode: TabNode) => {
            const component = widgetRegistryService.getWidget(tabNode.getComponent() ?? '')
            const isModified = component?.isModified
            // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
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
      label: t('close-all'),
      onClick: () => {
        if (contextMenuState !== null) {
          contextMenuState?.tabNode?.getParent()?.getChildren().forEach((tabNode: TabNode) => {
            closeWidget(tabNode.getId())
          })
          closeContextMenu()
        }
      }
    },
    ...createExpandItems(props)
  ]
}
