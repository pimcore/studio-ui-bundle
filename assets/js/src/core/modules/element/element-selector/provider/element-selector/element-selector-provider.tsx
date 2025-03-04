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
import { uuid } from '@Pimcore/utils/uuid'
import { type IRelationAllowedTypesDataComponent } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/relations/allowed-types'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface SelectedItem {
  elementType: ElementType
  data: {
    id: number
    type?: string
    fullpath: string
    published?: boolean | null
    [key: string]: any
  }
}

export interface ElementSelectorFinishEvent {
  items: SelectedItem[]
}

export interface ElementSelectorConfig {
  selectionType?: SelectionType
  onFinish?: (event: ElementSelectorFinishEvent) => void
  areas?: {
    asset: boolean
    document: boolean
    object: boolean
  }
  config?: {
    assets?: {
      allowedTypes?: IRelationAllowedTypesDataComponent['allowedAssetTypes']
    }

    documents?: {
      allowedTypes?: IRelationAllowedTypesDataComponent['allowedDocumentTypes']
    }

    objects?: {
      allowedTypes?: IRelationAllowedTypesDataComponent['allowedClasses']
    }
  }
}

export const defaultElementSelectorConfig: ElementSelectorConfig = {
  selectionType: SelectionType.Multiple,
  areas: {
    asset: true,
    document: true,
    object: true
  },
  config: {
    assets: {
      allowedTypes: undefined
    },
    documents: {
      allowedTypes: undefined
    },
    objects: {
      allowedTypes: undefined
    }
  }
}

export interface ElementSelectorData {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  config: ElementSelectorConfig
  setConfig: (config: ElementSelectorConfig) => void
  renderKey: string
  setRenderKey: (key: string) => void
}

export type ElementSelectorContextProps = ElementSelectorData | undefined

export const ElementSelectorContext = createContext<ElementSelectorContextProps>(undefined)

export interface ElementSelectorProviderProps {
  children: React.ReactNode
}

export const ElementSelectorProvider = ({ children }: ElementSelectorProviderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ElementSelectorConfig>(defaultElementSelectorConfig)
  const [renderKey, setRenderKey] = useState(uuid())

  return useMemo(() => {
    return (
      <ElementSelectorContext.Provider value={ { renderKey, setRenderKey, isOpen, setIsOpen, config, setConfig } }>
        <ElementSelector key={ renderKey } />

        {children}
      </ElementSelectorContext.Provider>
    )
  }, [children, isOpen, config])
}
