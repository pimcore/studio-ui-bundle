import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { type AssetContainerProps } from '../asset-container'
import { api } from '../asset-api-slice.gen'
import { store } from '@Pimcore/app/store'

interface OpenAssetWidgetProps {
  name: string
  icon: string
  config: AssetContainerProps
}

interface UseAssetReturn {
  openAsset: (props: OpenAssetWidgetProps) => void
}

export const useAsset = (): UseAssetReturn => {
  const { openMainWidget } = useWidgetManager()

  async function openAsset (props: OpenAssetWidgetProps): Promise<void> {
    const { name, icon, config } = props
    await store.dispatch(api.endpoints.apiAssetsIdGet.initiate({ id: config.id.toString() }))

    openMainWidget({
      name,
      icon,
      id: `asset-${config.id}`,
      component: 'asset',
      config
    })
  }

  return { openAsset }
}
