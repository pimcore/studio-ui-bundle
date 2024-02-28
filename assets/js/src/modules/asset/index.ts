import { registerWidget } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import '@Pimcore/modules/asset/editor-tabs/index'
import { AssetContainer } from './asset-container'

registerWidget({
  name: 'asset',
  component: AssetContainer
})
