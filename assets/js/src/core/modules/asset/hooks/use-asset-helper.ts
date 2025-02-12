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
import { api } from '../asset-api-slice-enhanced'
import { store, useAppDispatch } from '@Pimcore/app/store'
import { type EditorContainerProps } from '../editor/editor-container'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { checkElementPermission } from '@Pimcore/modules/element/permissions/permission-helper'
import { getElementIcon } from '@Pimcore/modules/element/element-helper'
import { getWidgetId } from '@Pimcore/modules/widget-manager/utils/tools'

interface OpenAssetWidgetProps {
  config: EditorContainerProps
}

interface UseAssetReturn {
  openAsset: (props: OpenAssetWidgetProps) => void
}

export const useAssetHelper = (): UseAssetReturn => {
  const { openMainWidget, isMainWidgetOpen } = useWidgetManager()
  const dispatch = useAppDispatch()

  const openAsset = async (props: OpenAssetWidgetProps): Promise<void> => {
    const { config } = props
    const widgetId = getWidgetId('asset', config.id)

    if (!isMainWidgetOpen(widgetId)) {
      dispatch(api.util.invalidateTags(invalidatingTags.ASSET_DETAIL_ID(config.id)))
    }

    const { data } = await store.dispatch(api.endpoints.assetGetById.initiate({ id: config.id }))

    if (
      data === undefined ||
      !checkElementPermission(data.permissions, 'view')) {
      return
    }

    openMainWidget({
      name: data?.filename,
      id: widgetId,
      component: 'asset-editor',
      config: {
        ...config,
        icon: getElementIcon(data, { value: 'widget', type: 'name' })
      }
    })
  }

  return { openAsset }
}
