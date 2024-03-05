import { registerWidget } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import '@Pimcore/modules/asset/editor-tabs/index'
import '@Pimcore/modules/asset/types/folder'
import { AssetContainer } from './asset-container'

registerWidget({
  name: 'asset',
  component: AssetContainer
})
