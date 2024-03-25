import { registerWidget } from '../widget-manager/utils/widget-registry'
import { Example } from './containers/example'
import { WidgetManagerActions } from './containers/widget-manager-actions'

registerWidget({
  name: 'example',
  component: Example
})

registerWidget({
  name: 'widget-manager-actions',
  component: WidgetManagerActions
})
