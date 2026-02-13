/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RuleItem } from '@Pimcore/modules/rule-builder/types/rule-item.types'
import type { DynamicTypeRuleTriggerRegistry } from '@Pimcore/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-registry'

export interface RuleTrigger extends RuleItem {}

export interface RuleTriggersProps {
  value?: RuleTrigger[]
  onChange?: (value: RuleTrigger[]) => void
  registry: DynamicTypeRuleTriggerRegistry
  disabled?: boolean
}
