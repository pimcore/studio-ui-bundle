/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RuleBaseCondition, type RuleConditionOperator, type RuleBracketValidationResult } from '../types/rule-condition.types'
import {
  BRACKET_ERROR_CLOSING_WITHOUT_OPENING,
  BRACKET_ERROR_MISSING_CLOSING
} from '../rule-condition.constants'

export function updateCondition (
  conditions: RuleBaseCondition[],
  id: string,
  updates: Partial<RuleBaseCondition>
): RuleBaseCondition[] {
  return conditions.map((c) =>
    c.id === id ? { ...c, ...updates } : c
  )
}

export function addCondition (
  conditions: RuleBaseCondition[],
  index: number,
  newCondition: RuleBaseCondition
): RuleBaseCondition[] {
  const safeIndex = Math.min(Math.max(0, index), conditions.length)
  return [
    ...conditions.slice(0, safeIndex),
    newCondition,
    ...conditions.slice(safeIndex)
  ]
}

export function moveCondition (
  conditions: RuleBaseCondition[],
  fromIndex: number,
  toIndex: number
): RuleBaseCondition[] {
  const newConditions = [...conditions]
  const [item] = newConditions.splice(fromIndex, 1)
  newConditions.splice(toIndex, 0, item)
  return newConditions
}

export function toggleBracket (
  conditions: RuleBaseCondition[],
  id: string,
  side: 'left' | 'right'
): RuleBaseCondition[] {
  return conditions.map((condition) => {
    if (condition.id !== id) {
      return condition
    }

    if (side === 'left') {
      return {
        ...condition,
        bracketLeft: !(condition.bracketLeft ?? false)
      }
    } else {
      return {
        ...condition,
        bracketRight: !(condition.bracketRight ?? false)
      }
    }
  })
}

export function updateOperator (
  conditions: RuleBaseCondition[],
  id: string,
  operator: RuleConditionOperator
): RuleBaseCondition[] {
  return updateCondition(conditions, id, { operator })
}

export function calculateIndentationLevels (
  conditions: RuleBaseCondition[]
): number[] {
  const levels: number[] = []
  let currentLevel = 0

  for (const condition of conditions) {
    levels.push(currentLevel)

    if (condition.bracketLeft === true) {
      currentLevel++
    }
    if (condition.bracketRight === true) {
      currentLevel = Math.max(0, currentLevel - 1)
    }
  }

  return levels
}

export function validateBrackets (
  conditions: RuleBaseCondition[]
): RuleBracketValidationResult {
  let balance = 0

  for (const condition of conditions) {
    if (condition.bracketLeft === true) {
      balance++
    }
    if (condition.bracketRight === true) {
      balance--
    }

    if (balance < 0) {
      return {
        valid: false,
        errorType: BRACKET_ERROR_CLOSING_WITHOUT_OPENING
      }
    }
  }

  if (balance !== 0) {
    return {
      valid: false,
      errorType: BRACKET_ERROR_MISSING_CLOSING
    }
  }

  return { valid: true }
}

export function isBracketUnmatched (
  conditions: RuleBaseCondition[],
  conditionId: string,
  side: 'left' | 'right'
): boolean {
  const index = conditions.findIndex((c) => c.id === conditionId)
  if (index === -1) return false

  const condition = conditions[index]
  const hasBracket = side === 'left' ? condition?.bracketLeft : condition?.bracketRight

  if (hasBracket !== true) return false

  let balance = 0
  const unmatchedOpenIndices: number[] = []

  for (let i = 0; i < conditions.length; i++) {
    const cond = conditions[i]

    if (cond.bracketLeft === true) {
      unmatchedOpenIndices.push(i)
      balance++
    }

    if (cond.bracketRight === true) {
      if (balance > 0 && unmatchedOpenIndices.length > 0) {
        unmatchedOpenIndices.pop()
        balance--
      } else {
        if (i === index && side === 'right') {
          return true
        }
      }
    }
  }

  if (side === 'left' && unmatchedOpenIndices.includes(index)) {
    return true
  }

  return false
}
