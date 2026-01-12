/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DynamicTypeFieldDefinitionAbstract, type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { DynamicTypeRegistryAbstract } from '@sdk/modules/element'
import { injectable } from 'inversify'

@injectable()
export class DynamicTypeFieldDefinitionRegistry extends DynamicTypeRegistryAbstract<DynamicTypeFieldDefinitionAbstract> {
  getTypesByTags (tags: string[], context: FieldDefinitionContext): DynamicTypeFieldDefinitionAbstract[] {
    return this.getDynamicTypes().filter((type) => {
      const typeTags = type.getTags(context)
      return tags.some(tag => typeTags.includes(tag))
    })
  }
}
