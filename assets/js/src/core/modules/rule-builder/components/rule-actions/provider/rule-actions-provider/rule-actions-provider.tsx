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
import type { RuleAction, RuleActionsProps } from '../../types/rule-actions.types'
import type { DynamicTypeRuleActionRegistry } from '@Pimcore/modules/rule-builder/dynamic-types/rule-action/dynamic-type-rule-action-registry'
import type { RuleItemMoveDirection } from '@Pimcore/modules/rule-builder/types/rule-item.types'

export interface RuleActionsProviderData {
  registry: DynamicTypeRuleActionRegistry
  handleAddAction: (type: string) => void
  handleRemoveAction: (id: string) => void
  handleMoveAction: (id: string, direction: RuleItemMoveDirection) => void
  handleUpdateAction: (id: string, config: Record<string, unknown>) => void
  canMoveUp: (id: string) => boolean
  canMoveDown: (id: string) => boolean
}

export type RuleActionsContextProps = RuleActionsProviderData | undefined

export const RuleActionsProviderContext = createContext<RuleActionsContextProps>(undefined)

export interface RuleActionsProviderProps extends RuleActionsProps {
  children: React.ReactNode
}

export const RuleActionsProvider = (props: RuleActionsProviderProps): React.JSX.Element => {
  const { children, ...ruleActionsProps } = props

  const {
    registry,
    handleAdd,
    handleRemove,
    handleMove,
    handleUpdate,
    canMoveUp,
    canMoveDown
  } = useRuleItems<RuleAction, DynamicTypeRuleActionRegistry>(ruleActionsProps)

  const value = useMemo(() => ({
    registry,
    handleAddAction: handleAdd,
    handleRemoveAction: handleRemove,
    handleMoveAction: handleMove,
    handleUpdateAction: handleUpdate,
    canMoveUp,
    canMoveDown
  }), [registry, handleAdd, handleRemove, handleMove, handleUpdate, canMoveUp, canMoveDown])

  return (
    <RuleActionsProviderContext.Provider value={ value }>
      {children}
    </RuleActionsProviderContext.Provider>
  )
}
