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

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { type DropdownProps } from '../dropdown'

export enum SelectionType {
  Disabled = 'disabled',
  Single = 'single',
  Multiple = 'multiple'
}

export interface ISelectionContext {
  selectionType: SelectionType
  selectedKeys: React.Key[]
  setSelectedKeys: (selected: React.Key[]) => void
  onSelected: DropdownProps['onSelect']
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
  onSelected?: DropdownProps['onSelect']
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
