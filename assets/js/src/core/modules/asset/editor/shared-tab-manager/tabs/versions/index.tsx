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

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import type { TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import { PreviewFieldLabelCell } from './table/cells/preview-field-label-cell/preview-field-label-cell'

moduleSystem.registerModule({
  onInit: () => {
    const typeRegistry = container.get<TypeRegistry>(serviceIds['Grid/TypeRegistry'])

    typeRegistry.registerType({
      component: PreviewFieldLabelCell,
      type: 'version-preview-field-label'
    })
  }
})
