/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Direction for moving rule items
 */
export type RuleItemMoveDirection = 'up' | 'down'

/**
 * Base interface for rule items (actions, triggers)
 */
export interface RuleItem {
  id: string
  type: string
  config: Record<string, unknown>
}

/**
 * Registry interface for managing rule items.
 * Registries that implement this can be used with useRuleItems hook.
 */
export interface RuleItemRegistry {
  getDefaultValue: (type: string) => any
}
