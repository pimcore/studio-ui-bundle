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

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import type { TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import {
  VersionIdCell
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/components/table/cells/version-id-cell/version-id-cell'
import {
  ActionsCell
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/components/table/cells/actions-cell/actions-cell'

moduleSystem.registerModule({
  onInit: () => {
    const typeRegistry = container.get<TypeRegistry>(serviceIds['Grid/TypeRegistry'])

    typeRegistry.registerType({
      type: 'version-id-select',
      component: VersionIdCell
    })

    typeRegistry.registerType({
      type: 'schedule-actions-select',
      component: ActionsCell
    })
  }
})
