/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { api } from '../asset-api-slice.gen'
import { store } from '@Pimcore/app/store'
import { type EditorContainerProps } from '../editor/editor-container'

interface OpenAssetWidgetProps {
  name: string
  icon: string
  config: EditorContainerProps
}

interface UseAssetReturn {
  openAsset: (props: OpenAssetWidgetProps) => void
}

export const useAsset = (): UseAssetReturn => {
  const { openMainWidget } = useWidgetManager()

  async function openAsset (props: OpenAssetWidgetProps): Promise<void> {
    const { name, icon, config } = props
    await store.dispatch(api.endpoints.getAssetById.initiate({ id: config.id }))

    openMainWidget({
      name,
      icon,
      id: `asset-${config.id}`,
      component: 'asset-editor',
      config
    })
  }

  return { openAsset }
}
