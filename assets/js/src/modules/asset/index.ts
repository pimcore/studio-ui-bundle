import { registerWidget } from '../widget-manager/utils/widget-registry'
import { Asset } from './containers/asset'

registerWidget({
  name: 'asset',
  component: Asset
})
