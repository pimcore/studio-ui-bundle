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
import { ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { container } from '@Pimcore/app/depency-injection'
import DefaultWysiwygEditor from './default-wysiwyg-editor/default-wysiwyg-editor'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: 'wysiwygEditor',
      component: DefaultWysiwygEditor
    })
  }
})
