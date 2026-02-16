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
import type { DynamicTypeRuleActionRegistry } from '@Pimcore/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-registry'

export interface RuleAction extends RuleItem {}

export interface RuleActionsProps {
  value?: RuleAction[]
  onChange?: (value: RuleAction[]) => void
  registry: DynamicTypeRuleActionRegistry
  disabled?: boolean
}
