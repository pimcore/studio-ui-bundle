/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { type IMenuProps } from '../menu'

export enum SelectionType {
  Disabled = 'disabled',
  Single = 'single',
  Multiple = 'multiple'
}

export interface ISelectionContext {
  selectionType: SelectionType
  selectedKeys: React.Key[]
  setSelectedKeys: (selected: React.Key[]) => void
  onSelected: IMenuProps['onSelect']
}

export const SelectionContext = createContext<ISelectionContext>({
  selectionType: SelectionType.Disabled,
  selectedKeys: [],
  setSelectedKeys: () => {},
  onSelected: () => {}
})

export interface SelectionProviderProps {
  selectedKeys?: ISelectionContext['selectedKeys']
  selectionType: SelectionType
  children: React.ReactNode
  onSelected?: IMenuProps['onSelect']
}

export const SelectionProvider = ({ children, onSelected, ...props }: SelectionProviderProps): React.JSX.Element => {
  const [selected, setSelected] = useState<ISelectionContext['selectedKeys']>(props.selectedKeys ?? [])

  useEffect(() => {
    setSelected(props.selectedKeys ?? [])
  }, [props.selectedKeys])

  return useMemo(() => (
    <SelectionContext.Provider value={ { selectedKeys: selected, setSelectedKeys, selectionType: props.selectionType, onSelected } }>
      {children}
    </SelectionContext.Provider>
  ), [selected, props.selectionType, children])

  function setSelectedKeys (selected: React.Key[]): void {
    setSelected(() => {
      if (onSelected !== undefined) {
        onSelected(selected)
      }

      return selected
    })
  }
}
