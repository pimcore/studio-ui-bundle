/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo, useCallback } from 'react'
import type {
  RuleConditionContextValue,
  RuleConditionProps,
  RuleBaseCondition
} from '../../types/rule-condition.types'
import { useRuleCondition } from '../../hooks/use-rule-condition'
import { CONDITION_ANIMATION_DURATION } from '../../rule-condition.constants'

export interface RuleConditionProviderData extends RuleConditionContextValue {
  conditions: RuleBaseCondition[]
  handleDragEnd: (event: any) => void
}

export type RuleConditionContextProps = RuleConditionContextValue | undefined

export const RuleConditionProviderContext = createContext<RuleConditionContextProps>(undefined)

export interface RuleConditionProviderProps extends RuleConditionProps {
  children: (data: { conditions: RuleBaseCondition[], handleDragEnd: (event: any) => void }) => React.ReactNode
}

export const RuleConditionProvider = (props: RuleConditionProviderProps): React.JSX.Element => {
  const { children, value, onChange, conditionTypes, disabled = false } = props
  const [newlyAddedId, setNewlyAddedId] = React.useState<string | null>(null)

  const initialValue = useMemo<RuleBaseCondition[]>(() => {
    return value ?? []
  }, [value])

  const {
    conditions,
    handleConditionChange,
    handleConditionRemove,
    handleConditionAdd,
    handleOperatorChange,
    handleBracketToggle,
    handleConditionMove,
    isLastCondition
  } = useRuleCondition({
    initialValue,
    onChange
  })

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event

    if (over === null || active.id === over.id) {
      return
    }

    const oldIndex = conditions.findIndex((c) => c.id === active.id)
    const newIndex = conditions.findIndex((c) => c.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      handleConditionMove(active.id as string, newIndex)
    }
  }, [conditions, handleConditionMove])

  const handleConditionAddWithTracking = useCallback((afterIndex: number, conditionType: string) => {
    const newId = handleConditionAdd(afterIndex, conditionType)
    setNewlyAddedId(newId)

    setTimeout(() => {
      setNewlyAddedId(null)
    }, CONDITION_ANIMATION_DURATION)
  }, [handleConditionAdd])

  const contextValue: RuleConditionContextValue = useMemo(() => ({
    conditionTypes,
    disabled,
    onConditionChange: handleConditionChange,
    onConditionRemove: handleConditionRemove,
    onConditionAdd: handleConditionAddWithTracking,
    onOperatorChange: handleOperatorChange,
    onBracketToggle: handleBracketToggle,
    onConditionMove: handleConditionMove,
    isLastCondition,
    newlyAddedId
  }), [
    conditionTypes,
    disabled,
    handleConditionChange,
    handleConditionRemove,
    handleConditionAddWithTracking,
    handleOperatorChange,
    handleBracketToggle,
    handleConditionMove,
    isLastCondition,
    newlyAddedId
  ])

  return (
    <RuleConditionProviderContext.Provider value={ contextValue }>
      {children({ conditions, handleDragEnd })}
    </RuleConditionProviderContext.Provider>
  )
}
