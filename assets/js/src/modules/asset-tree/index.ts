import { registerWidget } from '../widget-manager/utils/widget-registry'
import { AssetTree } from './containers/asset-tree'

registerWidget({
  name: 'asset-tree',
  component: AssetTree
})
