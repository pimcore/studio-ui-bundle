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
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { container } from '@sdk/app'

moduleSystem.registerModule({
  onInit: () => {
    const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>('DynamicTypes/FieldDefinitionRegistry')

    fieldDefinitionRegistry.registerDynamicType(container.get('DynamicTypes/FieldDefinition/Block'))
    fieldDefinitionRegistry.registerDynamicType(container.get('DynamicTypes/FieldDefinition/Input'))
    fieldDefinitionRegistry.registerDynamicType(container.get('DynamicTypes/FieldDefinition/Panel'))
  }
})
