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

import React, { createContext, useMemo, useState } from 'react'
import { ElementSelector } from '../../element-selector'
import { SelectionType } from '@Pimcore/components/dropdown/selection/selection-provider'

export interface ElementSelectorFinishEvent {
  data: any
}

export interface ElementSelectorConfig {
  selectionType?: SelectionType
  onFinish?: (event: ElementSelectorFinishEvent) => void
  areas?: {
    asset: boolean
    document: boolean
    object: boolean
  }
}

export interface ElementSelectorData {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  config: ElementSelectorConfig
  setConfig: (config: ElementSelectorConfig) => void
}

export const defaultElementSelectorConfig: ElementSelectorConfig = {
  selectionType: SelectionType.Multiple,
  areas: {
    asset: true,
    document: true,
    object: true
  }
}

export type ElementSelectorContextProps = ElementSelectorData | undefined

export const ElementSelectorContext = createContext<ElementSelectorContextProps>(undefined)

export interface ElementSelectorProviderProps {
  children: React.ReactNode
}

export const ElementSelectorProvider = ({ children }: ElementSelectorProviderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ElementSelectorConfig>(defaultElementSelectorConfig)

  return useMemo(() => {
    return (
      <ElementSelectorContext.Provider value={ { isOpen, setIsOpen, config, setConfig } }>
        <ElementSelector />

        {children}
      </ElementSelectorContext.Provider>
    )
  }, [children, isOpen, config])
}
