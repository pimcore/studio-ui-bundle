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

import React, { useMemo, useState, useCallback, useContext, useTransition } from 'react'
import { type NamePath } from 'antd/es/form/interface'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { type DataObjectDraft } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'

export interface InheritanceState {
  inherited: boolean | 'broken'
  objectId: number
}

export interface IInheritanceStateContext {
  getInheritanceState: (name: NamePath) => InheritanceState | undefined
  breakInheritance: (name: NamePath) => void
}

export const InheritanceStateContext = React.createContext<IInheritanceStateContext | undefined>(undefined)

const getInitialInheritanceState = (dataObjectDraft?: DataObjectDraft): Record<string, InheritanceState> => {
  const inheritanceStates: Record<string, InheritanceState> = {}

  if (dataObjectDraft === undefined) {
    return inheritanceStates
  }
  const traverseMetaData = (metaData: unknown, path: string[] = []): void => {
    if (typeof metaData !== 'object' || metaData === null) return

    Object.entries(metaData).forEach(([key, value]) => {
      const currentPath = [...path, key]
      if (
        typeof value === 'object' &&
          'objectId' in value &&
          'inherited' in value &&
          typeof value.objectId === 'number' &&
          typeof value.inherited === 'boolean'
      ) {
        const stateKey = currentPath.join('.')
        inheritanceStates[stateKey] = {
          objectId: value.objectId,
          inherited: value.inherited
        }
      } else {
        traverseMetaData(value, currentPath)
      }
    })
  }

  if (
    typeof dataObjectDraft === 'object' &&
      'inheritanceData' in dataObjectDraft &&
      typeof dataObjectDraft.inheritanceData === 'object' &&
      'metaData' in dataObjectDraft.inheritanceData &&
      typeof dataObjectDraft.inheritanceData.metaData === 'object'
  ) {
    traverseMetaData(dataObjectDraft.inheritanceData.metaData)
  }

  return inheritanceStates
}

export const InheritanceStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const [inheritanceStates, setInheritanceStates] = useState<Record<string, InheritanceState>>(getInitialInheritanceState(dataObject))
  const [, startTransition] = useTransition()

  const getInheritanceState = useCallback((name: NamePath): InheritanceState | undefined => {
    const key = Array.isArray(name) ? name.join('.') : name.toString()
    return inheritanceStates[key]
  }, [inheritanceStates])

  const setInheritanceState = useCallback((name: NamePath, state: InheritanceState): void => {
    const key = Array.isArray(name) ? name.join('.') : name.toString()
    setInheritanceStates(prevStates => ({
      ...prevStates,
      [key]: state
    }))
  }, [])

  const breakInheritance = useCallback((name: NamePath): void => {
    if (getInheritanceState(name)?.inherited === false) {
      return
    }

    startTransition(() => {
      setInheritanceState(name, {
        objectId: id,
        inherited: 'broken'
      })
    })
  }, [])

  const value = useMemo(() => ({
    getInheritanceState,
    breakInheritance
  }), [getInheritanceState, breakInheritance])

  return (
    <InheritanceStateContext.Provider value={ value }>
      { children }
    </InheritanceStateContext.Provider>
  )
}
