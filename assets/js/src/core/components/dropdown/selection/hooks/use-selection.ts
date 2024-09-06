/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import type React from 'react'
import { useContext } from 'react'
import { type ISelectionContext, SelectionContext, SelectionType } from '../selection-provider'

export interface UseSelectionHookReturn extends ISelectionContext {
  isSelected: (key: React.Key) => boolean
  select: (key: React.Key) => void
  deselect: (key: React.Key) => void
  toggle: (key: React.Key) => void
}

export const useSelection = (): UseSelectionHookReturn => {
  const { selectedKeys, setSelectedKeys, selectionType, ...context } = useContext(SelectionContext)

  function isSelected (key: React.Key): boolean {
    return selectedKeys.includes(key)
  }

  function select (key: React.Key): void {
    if (selectionType === SelectionType.Disabled) {
      return
    }

    if (selectionType === SelectionType.Single) {
      setSelectedKeys([key])
      return
    }

    if (selectionType === SelectionType.Multiple) {
      setSelectedKeys([...selectedKeys, key])
    }
  }

  function deselect (key: React.Key): void {
    if (selectionType === SelectionType.Disabled) {
      return
    }

    setSelectedKeys(selectedKeys.filter((selectedKey) => selectedKey !== key))
  }

  function toggle (key: React.Key): void {
    if (isSelected(key)) {
      deselect(key)
      return
    }

    select(key)
  }

  return {
    isSelected,
    select,
    deselect,
    toggle,
    selectedKeys,
    setSelectedKeys,
    selectionType,
    ...context
  }
}
