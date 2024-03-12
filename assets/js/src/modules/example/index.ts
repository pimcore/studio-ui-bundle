import { registerWidget } from '../widget-manager/utils/widget-registry'
import { Example } from './containers/example'

registerWidget({
  name: 'example',
  component: Example
})
