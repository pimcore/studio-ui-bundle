import { registerWidget } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import { Tab as AssetTab } from '@Pimcore/modules/asset/tab/tab'
import '@Pimcore/modules/asset/toolbar/index'

registerWidget({
  name: 'asset-tab',
  component: AssetTab
})
