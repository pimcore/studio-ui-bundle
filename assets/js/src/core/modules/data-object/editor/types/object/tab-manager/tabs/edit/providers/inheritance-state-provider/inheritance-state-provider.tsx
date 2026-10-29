/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState, useCallback, useContext, useTransition } from 'react'
import { type NamePath } from 'antd/es/form/interface'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { type DataObjectDraft } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { DataObjectContext } from '@Pimcore/modules/data-object/data-object-provider'
import { isArray, isNil, isUndefined } from 'lodash'

export interface InheritanceState {
  /**
   * 'broken' marks a field that takes part in inheritance but carries an own value:
   * either changed during this editing session or already overridden when loaded.
   */
  inherited: boolean | 'broken'
  /**
   * Object the value originates from. Undefined after restoring a field that was
   * overridden when loaded: the backend reports the ancestor value, not its object.
   */
  objectId?: number
}

export interface IInheritanceStateContext {
  getInheritanceState: (name: NamePath) => InheritanceState | undefined
  breakInheritance: (name: NamePath) => void
  /** Whether restoreInheritance can give the field back to its origin object. */
  canRestoreInheritance: (name: NamePath) => boolean
  /**
   * Value the field takes when its inheritance is restored, normalized like the
   * object data. Undefined when that is the value the field was loaded with.
   */
  getInheritedValue: (name: NamePath) => unknown
  restoreInheritance: (name: NamePath) => void
}

export const InheritanceStateContext = React.createContext<IInheritanceStateContext | undefined>(undefined)

const getStateKey = (name: NamePath): string => isArray(name) ? name.join('.') : name.toString()

interface RestoreTarget {
  state: InheritanceState
  /** See IInheritanceStateContext.getInheritedValue. */
  value?: unknown
}

interface InitialInheritance {
  states: Record<string, InheritanceState>
  restoreTargets: Record<string, RestoreTarget>
}

const getInitialInheritance = (dataObjectDraft?: DataObjectDraft): InitialInheritance => {
  const inheritanceStates: Record<string, InheritanceState> = {}
  const restoreTargets: Record<string, RestoreTarget> = {}

  if (dataObjectDraft === undefined) {
    return { states: inheritanceStates, restoreTargets }
  }
  const traverseMetaData = (metaData: unknown, path: string[] = []): void => {
    if (isNil(metaData) || typeof metaData !== 'object') return

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

        if (value.inherited) {
          inheritanceStates[stateKey] = { objectId: value.objectId, inherited: true }
          restoreTargets[stateKey] = { state: inheritanceStates[stateKey] }
          return
        }

        // An own value that hides an ancestor value: overridden in an earlier session.
        // inheritedValue is null when no ancestor holds a value, so there is nothing to
        // restore, and absent when inheritable is false.
        const isOverridden = 'inheritable' in value && value.inheritable === true &&
          'inheritedValue' in value && !isNil(value.inheritedValue)

        if (isOverridden) {
          inheritanceStates[stateKey] = { objectId: value.objectId, inherited: 'broken' }
          restoreTargets[stateKey] = { state: { inherited: true }, value: value.inheritedValue }
          return
        }

        inheritanceStates[stateKey] = { objectId: value.objectId, inherited: false }
      } else {
        traverseMetaData(value, currentPath)
      }
    })
  }

  if (
    typeof dataObjectDraft === 'object' &&
      'inheritanceData' in dataObjectDraft &&
      typeof dataObjectDraft.inheritanceData === 'object' &&
      dataObjectDraft.inheritanceData !== null && 'metaData' in dataObjectDraft.inheritanceData &&
      typeof dataObjectDraft.inheritanceData.metaData === 'object'
  ) {
    traverseMetaData(dataObjectDraft.inheritanceData.metaData)
  }

  return { states: inheritanceStates, restoreTargets }
}

export const InheritanceStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { id } = useContext(DataObjectContext)
  const { dataObject } = useDataObjectDraft(id)
  const [{ states: initialInheritanceStates, restoreTargets }] = useState<InitialInheritance>(() => getInitialInheritance(dataObject))
  const [inheritanceStates, setInheritanceStates] = useState<Record<string, InheritanceState>>(initialInheritanceStates)
  const [, startTransition] = useTransition()

  const getInheritanceState = useCallback((name: NamePath): InheritanceState | undefined => {
    return inheritanceStates[getStateKey(name)]
  }, [inheritanceStates])

  /**
   * Marks an inherited field as carrying an own value. Only a field that currently
   * reads as inherited is broken, decided on the latest state rather than on the
   * caller's: the object editor form keeps the change handler of its first render,
   * so its view of the state can be as old as the editor, and a field restored since
   * then would otherwise never be broken again.
   */
  const breakInheritance = useCallback((name: NamePath): void => {
    const key = getStateKey(name)

    startTransition(() => {
      setInheritanceStates(prevStates => prevStates[key]?.inherited === true
        ? { ...prevStates, [key]: { objectId: id, inherited: 'broken' } }
        : prevStates
      )
    })
  }, [id])

  const canRestoreInheritance = useCallback((name: NamePath): boolean => {
    const key = getStateKey(name)

    return inheritanceStates[key]?.inherited === 'broken' && !isUndefined(restoreTargets[key])
  }, [inheritanceStates, restoreTargets])

  const getInheritedValue = useCallback((name: NamePath): unknown => {
    return restoreTargets[getStateKey(name)]?.value
  }, [restoreTargets])

  /**
   * Gives a field back to its origin object: a field inherited when loaded returns to
   * that state, a field overridden when loaded becomes inherited from an ancestor that
   * is not known here. Fields without an ancestor value are left untouched.
   *
   * Applied right away, not as a transition like breakInheritance: the change
   * handlers only break a field whose state reads as inherited, so an edit landing
   * while a restore is still pending would read 'broken', skip the break, and the
   * restore committing afterwards would mark the own value as inherited.
   */
  const restoreInheritance = useCallback((name: NamePath): void => {
    const key = getStateKey(name)
    const restoreTarget = restoreTargets[key]

    if (isUndefined(restoreTarget)) {
      return
    }

    setInheritanceStates(prevStates => ({
      ...prevStates,
      [key]: restoreTarget.state
    }))
  }, [restoreTargets])

  const value = useMemo(() => ({
    getInheritanceState,
    breakInheritance,
    canRestoreInheritance,
    getInheritedValue,
    restoreInheritance
  }), [getInheritanceState, breakInheritance, canRestoreInheritance, getInheritedValue, restoreInheritance])

  return (
    <InheritanceStateContext.Provider value={ value }>
      { children }
    </InheritanceStateContext.Provider>
  )
}
