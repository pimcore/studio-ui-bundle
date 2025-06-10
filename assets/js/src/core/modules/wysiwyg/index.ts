/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { container } from '@Pimcore/app/depency-injection'
import DefaultWysiwygEditor from './default-wysiwyg-editor/default-wysiwyg-editor'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

console.log({moduleSystem});

moduleSystem.registerModule({
  onInit: () => {
    console.log('Wysiwyg module initialized');
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: componentConfig.wysiwyg.editor.name,
      component: DefaultWysiwygEditor
    })
  }
})
