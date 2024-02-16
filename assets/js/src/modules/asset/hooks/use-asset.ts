import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { type AssetProps } from '../containers/asset'

interface OpenAssetWidgetProps {
  name: string
  icon: string
  config: AssetProps
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
