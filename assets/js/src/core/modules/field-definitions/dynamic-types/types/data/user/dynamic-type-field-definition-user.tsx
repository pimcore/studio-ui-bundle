/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { DynamicTypeFieldDefinitionDataAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/types/data/_abstracts/dynamic-type-field-defintion-data-abstract'
import { type ElementIcon } from '@sdk/modules/widget-manager'

export class DynamicTypeFieldDefinitionUser extends DynamicTypeFieldDefinitionDataAbstract {
  id: string = 'user'

  getIcon (): ElementIcon {
    return { type: 'name', value: 'user' }
  }

  getGroup (): string[] {
    return [...super.getGroup(), 'select']
  }

  getTags (props: FieldDefinitionContext): string[] {
    return [...super.getTags(props), 'group:select', 'encryptedFieldSupport', 'classificationStore']
  }
}
