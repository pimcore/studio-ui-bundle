/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { container } from '../depency-injection'
import { pluginSystem } from '../plugin-system/plugin-system'
import { serviceIds } from '../config/services/service-ids'

export interface PublicApi {
  container: typeof container
  serviceIds: typeof serviceIds
  pluginSystem: typeof pluginSystem
}

export const Pimcore: PublicApi = {
  container,
  serviceIds,
  pluginSystem
}
