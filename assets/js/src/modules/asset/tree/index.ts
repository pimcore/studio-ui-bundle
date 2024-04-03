import { registerWidget } from '@Pimcore/modules/widget-manager/utils/widget-registry'
import { AssetTreeContainer } from './asset-tree-container'

registerWidget({
  name: 'asset-tree',
  component: AssetTreeContainer
})
