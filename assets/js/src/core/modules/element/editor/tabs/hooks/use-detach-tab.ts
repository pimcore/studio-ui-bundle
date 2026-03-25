/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import i18next from 'i18next'
import { useTabManager } from '@Pimcore/modules/element/editor/shared-tab-manager/hooks/use-tab-manager'

export interface IDetachTab {
  tabKey: string
  config?: any
}

interface IUseDetachTabReturn {
  detachWidget: (args: IDetachTab) => void
}

export const useDetachTab = (): IUseDetachTabReturn => {
  const { openBottomWidget } = useWidgetManager()
  const tabManager = useTabManager()

  const detachWidget = ({ tabKey, config = {} }: IDetachTab): void => {
    const tab = tabManager.getTab(tabKey)

    if (tab === undefined) {
      return
    }

    openBottomWidget({
      name: i18next.t(String(tab.label)),
      id: `${tabKey}-detached`,
      component: 'detachable-tab',
      config: {
        ...config,
        icon: tab.icon.props,
        tabKey
      }
    })
  }

  return { detachWidget }
}
