/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DynamicTypeRuleConditionRegistry } from '@Pimcore/modules/rule-builder/dynamic-types/rule-condition/dynamic-type-rule-condition-registry'
import type { RuleBaseCondition } from '@Pimcore/components/rule-condition/types/rule-condition.types'

export interface RuleConditionsProps {
  value?: RuleBaseCondition[]
  onChange?: (value: RuleBaseCondition[]) => void
  registry: DynamicTypeRuleConditionRegistry
  disabled?: boolean
}
