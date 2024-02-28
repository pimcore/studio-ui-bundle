import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { type AssetContainerProps } from '../asset-container'

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

  function openAsset (props: OpenAssetWidgetProps): void {
    const { name, icon, config } = props

    openMainWidget({
      name,
      icon,
      component: 'asset',
      config
    })
  }

  return { openAsset }
}
