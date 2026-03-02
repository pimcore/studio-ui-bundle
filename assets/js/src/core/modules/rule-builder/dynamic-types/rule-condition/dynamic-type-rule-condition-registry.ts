/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type DynamicTypeRuleConditionAbstract } from './dynamic-type-rule-condition-abstract'
import type { RuleConditionTypeConfig } from '@Pimcore/components/rule-condition/types/rule-condition.types'

@injectable()
export class DynamicTypeRuleConditionRegistry extends DynamicTypeRegistryAbstract<DynamicTypeRuleConditionAbstract<any>> {
  getConditionTypeConfig (id: string): RuleConditionTypeConfig<any> | undefined {
    const type = this.getDynamicType(id, false)
    if (type === undefined) {
      return undefined
    }

    return {
      id: type.id,
      label: type.label,
      icon: type.icon,
      defaultValue: type.defaultValue,
      renderForm: type.renderForm
    }
  }
}
