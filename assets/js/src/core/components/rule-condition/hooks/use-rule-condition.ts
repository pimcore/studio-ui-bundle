/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback, useRef, useEffect } from 'react'
import {
  type RuleBaseCondition,
  type RuleConditionOperator
} from '../types/rule-condition.types'
import {
  updateCondition,
  addCondition,
  moveCondition,
  updateOperator,
  toggleBracket
} from '../utils/condition-array-utils'
import { uuid } from '@Pimcore/utils/uuid'

interface UseRuleConditionProps {
  initialValue: RuleBaseCondition[]
  onChange?: (value: RuleBaseCondition[]) => void
}

interface UseRuleConditionReturn {
  conditions: RuleBaseCondition[]
  handleConditionChange: (id: string, value: RuleBaseCondition) => void
  handleConditionRemove: (id: string) => void
  handleConditionAdd: (afterIndex: number, conditionType: string) => string
  handleOperatorChange: (id: string, operator: RuleConditionOperator) => void
  handleBracketToggle: (id: string, side: 'left' | 'right') => void
  handleConditionMove: (id: string, newIndex: number) => void
  isLastCondition: (id: string) => boolean
}

export function useRuleCondition ({
  initialValue,
  onChange
}: UseRuleConditionProps): UseRuleConditionReturn {
  const [conditions, setConditions] = useState<RuleBaseCondition[]>(initialValue)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    setConditions(initialValue)
  }, [initialValue])

  const propagateChange = useCallback((newConditions: RuleBaseCondition[]) => {
    setConditions(newConditions)
    onChangeRef.current?.(newConditions)
  }, [])

  const handleConditionChange = useCallback((id: string, value: RuleBaseCondition) => {
    const newConditions = updateCondition(conditions, id, value)
    propagateChange(newConditions)
  }, [conditions, propagateChange])

  const handleConditionRemove = useCallback((id: string) => {
    const newConditions = conditions.filter((c) => c.id !== id)
    propagateChange(newConditions)
  }, [conditions, propagateChange])

  const handleConditionAdd = useCallback((
    afterIndex: number,
    conditionType: string
  ): string => {
    const newCondition: RuleBaseCondition = {
      id: uuid(),
      type: conditionType,
      operator: 'and'
    }
    const newConditions = addCondition(conditions, afterIndex + 1, newCondition)
    propagateChange(newConditions)
    return newCondition.id
  }, [conditions, propagateChange])

  const handleOperatorChange = useCallback((
    id: string,
    operator: RuleConditionOperator
  ) => {
    const newConditions = updateOperator(conditions, id, operator)
    propagateChange(newConditions)
  }, [conditions, propagateChange])

  const handleBracketToggle = useCallback((
    id: string,
    side: 'left' | 'right'
  ) => {
    const newConditions = toggleBracket(conditions, id, side)
    propagateChange(newConditions)
  }, [conditions, propagateChange])

  const handleConditionMove = useCallback((
    conditionId: string,
    newIndex: number
  ) => {
    const currentIndex = conditions.findIndex((c) => c.id === conditionId)
    if (currentIndex === -1) return

    const newConditions = moveCondition(conditions, currentIndex, newIndex)
    propagateChange(newConditions)
  }, [conditions, propagateChange])

  const isLastCondition = useCallback((conditionId: string): boolean => {
    if (conditions.length === 0) return true
    const lastCondition = conditions[conditions.length - 1]
    return lastCondition?.id === conditionId
  }, [conditions])

  return {
    conditions,
    handleConditionChange,
    handleConditionRemove,
    handleConditionAdd,
    handleOperatorChange,
    handleBracketToggle,
    handleConditionMove,
    isLastCondition
  }
}
