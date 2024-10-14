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

import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { container } from '@Pimcore/app/depency-injection'
import { type TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import i18next from 'i18next'

export interface IDetachTab {
  tabKey: string
  config?: any
}

interface IUseDetachTabReturn {
  detachWidget: (args: IDetachTab) => void
}

export const useDetachTab = (): IUseDetachTabReturn => {
  const { openBottomWidget } = useWidgetManager()

  const detachWidget = ({ tabKey, config = {} }: IDetachTab): void => {
    const tabManager = container.get<TabManager>('Asset/Editor/ImageTabManager')
    const tab = tabManager.getTab(tabKey)

    if (tab === undefined) {
      return
    }

    openBottomWidget({
      name: i18next.t(String(tab.label)),
      icon: String(tab.icon.props.name),
      id: `${tabKey}-detached`,
      component: 'detachable-tab',
      config: {
        ...config,
        tabKey
      }
    })
  }

  return { detachWidget }
}
