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
import { type IAdvancedEditorTab } from '@Pimcore/components/editor-tabs/editor-tabs'

interface IDetachTab {
  item: IAdvancedEditorTab
  config?: any
}

interface IUseDetachTabReturn {
  detachWidget: ({ item, config }: IDetachTab) => void
}

export const useDetachTab = (): IUseDetachTabReturn => {
  const { openBottomWidget } = useWidgetManager()

  const detachWidget = ({ item, config = {} }: IDetachTab): void => {
    openBottomWidget({
      name: item.originalLabel,
      icon: 'share-03',
      id: `${item.key}-detached`,
      component: 'asset-tab-embedded-metadata',
      config
    })
  }

  return { detachWidget }
}
