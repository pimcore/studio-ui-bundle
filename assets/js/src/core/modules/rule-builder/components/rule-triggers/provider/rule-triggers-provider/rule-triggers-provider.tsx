/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useMemo } from 'react'
import { useRuleItems } from '@Pimcore/modules/rule-builder/components/shared/hooks/use-rule-items'
import type { RuleTrigger, RuleTriggersProps } from '../../types/rule-triggers.types'
import type { DynamicTypeRuleTriggerRegistry } from '@Pimcore/modules/rule-builder/dynamic-types/rule-trigger/dynamic-type-rule-trigger-registry'
import type { RuleItemMoveDirection } from '@Pimcore/modules/rule-builder/types/rule-item.types'

export interface RuleTriggersProviderData {
  registry: DynamicTypeRuleTriggerRegistry
  handleAddTrigger: (type: string) => void
  handleRemoveTrigger: (id: string) => void
  handleMoveTrigger: (id: string, direction: RuleItemMoveDirection) => void
  handleUpdateTrigger: (id: string, config: Record<string, unknown>) => void
  canMoveUp: (id: string) => boolean
  canMoveDown: (id: string) => boolean
}

export type RuleTriggersContextProps = RuleTriggersProviderData | undefined

export const RuleTriggersProviderContext = createContext<RuleTriggersContextProps>(undefined)

export interface RuleTriggersProviderProps extends RuleTriggersProps {
  children: React.ReactNode
}

export const RuleTriggersProvider = (props: RuleTriggersProviderProps): React.JSX.Element => {
  const { children, ...ruleTriggersProps } = props

  const {
    registry,
    handleAdd,
    handleRemove,
    handleMove,
    handleUpdate,
    canMoveUp,
    canMoveDown
  } = useRuleItems<RuleTrigger, DynamicTypeRuleTriggerRegistry>(ruleTriggersProps)

  const value = useMemo(() => ({
    registry,
    handleAddTrigger: handleAdd,
    handleRemoveTrigger: handleRemove,
    handleMoveTrigger: handleMove,
    handleUpdateTrigger: handleUpdate,
    canMoveUp,
    canMoveDown
  }), [registry, handleAdd, handleRemove, handleMove, handleUpdate, canMoveUp, canMoveDown])

  return (
    <RuleTriggersProviderContext.Provider value={ value }>
      {children}
    </RuleTriggersProviderContext.Provider>
  )
}
