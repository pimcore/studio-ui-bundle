/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { uuid } from '@Pimcore/utils/uuid'
import { type RuleItem, type RuleItemRegistry, type RuleItemMoveDirection } from '@Pimcore/modules/rule-builder/types/rule-item.types'

export interface UseRuleItemsProps<T extends RuleItem, R extends RuleItemRegistry> {
  value?: T[]
  onChange?: (value: T[]) => void
  registry: R
}

export interface UseRuleItemsReturn<R extends RuleItemRegistry> {
  registry: R
  handleAdd: (type: string) => void
  handleRemove: (id: string) => void
  handleMove: (id: string, direction: RuleItemMoveDirection) => void
  handleUpdate: (id: string, config: Record<string, unknown>) => void
  canMoveUp: (id: string) => boolean
  canMoveDown: (id: string) => boolean
}

/**
 * Shared hook for managing rule items (actions, triggers)
 */
export function useRuleItems<T extends RuleItem, R extends RuleItemRegistry> (
  props: UseRuleItemsProps<T, R>
): UseRuleItemsReturn<R> {
  const { value = [], onChange, registry } = props

  const handleAdd = useCallback((type: string): void => {
    if (onChange === undefined) return

    const defaultValue = registry.getDefaultValue(type)
    const newItem: RuleItem = {
      id: uuid(),
      type,
      config: defaultValue
    }
    onChange([...value, newItem as T])
  }, [onChange, registry, value])

  const handleRemove = useCallback((id: string): void => {
    if (onChange === undefined) return
    onChange(value.filter((item) => item.id !== id))
  }, [onChange, value])

  const handleMove = useCallback((id: string, direction: RuleItemMoveDirection): void => {
    if (onChange === undefined) return

    const index = value.findIndex((item) => item.id === id)
    if (index === -1) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= value.length) return

    const newItems = [...value]
    const [movedItem] = newItems.splice(index, 1)
    newItems.splice(newIndex, 0, movedItem)
    onChange(newItems)
  }, [onChange, value])

  const handleUpdate = useCallback((id: string, config: Record<string, unknown>): void => {
    if (onChange === undefined) return
    const newItems = value.map((item) =>
      item.id === id ? { ...item, config } : item
    )
    onChange(newItems)
  }, [onChange, value])

  const canMoveUp = useCallback((id: string): boolean => {
    const index = value.findIndex((item) => item.id === id)
    return index > 0
  }, [value])

  const canMoveDown = useCallback((id: string): boolean => {
    const index = value.findIndex((item) => item.id === id)
    return index >= 0 && index < value.length - 1
  }, [value])

  return {
    registry,
    handleAdd,
    handleRemove,
    handleMove,
    handleUpdate,
    canMoveUp,
    canMoveDown
  }
}
