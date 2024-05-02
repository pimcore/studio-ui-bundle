/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

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
