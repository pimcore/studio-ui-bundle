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
import { api } from '../asset-api-slice.gen'
import { store } from '@Pimcore/app/store'
import { type EditorContainerProps } from '../editor/editor-container'

interface OpenAssetWidgetProps {
  config: EditorContainerProps
}

interface UseAssetReturn {
  openAsset: (props: OpenAssetWidgetProps) => void
}

export const useAsset = (): UseAssetReturn => {
  const { openMainWidget } = useWidgetManager()

  async function openAsset (props: OpenAssetWidgetProps): Promise<void> {
    const { config } = props
    const asset = await store.dispatch(api.endpoints.assetGetById.initiate({ id: config.id }))

    if (asset.data?.icon?.type === 'path') {
      return
    }

    openMainWidget({
      name: asset.data?.filename,
      icon: asset.data?.icon?.value,
      id: `asset-${config.id}`,
      component: 'asset-editor',
      config
    })
  }

  return { openAsset }
}
