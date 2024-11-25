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

import { type GlobalAssetContext, useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import {
  type GlobalDataObjectContext,
  useGlobalDataObjectContext
} from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

export type GlobalElementContext = GlobalAssetContext | GlobalDataObjectContext

interface UseGlobalElementContext {
  context: GlobalElementContext | undefined
}

export const useGlobalElementContext = (): UseGlobalElementContext => {
  const { getOpenedMainWidget } = useWidgetManager()

  const { context: assetContext } = useGlobalAssetContext()
  const { context: dataObjectContext } = useGlobalDataObjectContext()

  const openedMainWidgetComponent = getOpenedMainWidget()?.getComponent()

  if (openedMainWidgetComponent === 'asset-editor') {
    return { context: assetContext }
  } else if (openedMainWidgetComponent === 'data-object-editor') {
    return { context: dataObjectContext }
  } else {
    return { context: undefined }
  }
}
