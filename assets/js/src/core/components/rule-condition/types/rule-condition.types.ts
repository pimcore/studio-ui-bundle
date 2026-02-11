/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactNode } from 'react'
import { type ElementIcon } from '@Pimcore/components/icon/icon'

export type RuleConditionOperator = 'and' | 'or' | 'and_not'

export interface RuleBaseCondition {
  id: string
  type: string
  operator?: RuleConditionOperator
  bracketLeft?: boolean
  bracketRight?: boolean
  [key: string]: unknown
}

export interface RuleConditionFormProps<T extends RuleBaseCondition = RuleBaseCondition> {
  value: T
  onChange: (value: T) => void
  disabled?: boolean
}

/**
 * Configuration for a condition type.
 * renderForm must return a FormKit component with Form.Items for consistent styling.
 */
export interface RuleConditionTypeConfig<T extends RuleBaseCondition = RuleBaseCondition> {
  id: string
  label: string
  icon?: ElementIcon
  defaultValue?: Partial<Omit<T, 'id' | 'type'>>
  renderForm: (props: RuleConditionFormProps<T>) => ReactNode
  isAvailable?: () => boolean
  notAvailableHint?: string
}

export interface RuleConditionProps {
  value?: RuleBaseCondition[]
  onChange?: (value: RuleBaseCondition[]) => void
  conditionTypes: Array<RuleConditionTypeConfig<RuleBaseCondition>>
  disabled?: boolean
}

export interface RuleConditionContextValue {
  conditionTypes: Array<RuleConditionTypeConfig<RuleBaseCondition>>
  disabled: boolean
  onConditionChange: (id: string, value: RuleBaseCondition) => void
  onConditionRemove: (id: string) => void
  onConditionAdd: (afterIndex: number, conditionType: string) => void
  onOperatorChange: (id: string, operator: RuleConditionOperator) => void
  onBracketToggle: (id: string, side: 'left' | 'right') => void
  onConditionMove: (id: string, newIndex: number) => void
  isLastCondition: (id: string) => boolean
  newlyAddedId: string | null
}

export interface RuleDraggableConditionItem {
  id: string
  item: RuleBaseCondition
}

export interface RuleBracketValidationResult {
  valid: boolean
  errorType?: string
}
