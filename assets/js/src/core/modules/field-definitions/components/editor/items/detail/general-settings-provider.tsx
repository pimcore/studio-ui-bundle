/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEqual } from 'lodash'
import React, { createContext, useContext, useMemo, useState } from 'react'

export type GeneralSettings = Record<string, unknown>

export interface IGeneralSettingsContext {
  generalSettings: GeneralSettings | undefined
  setGeneralSettings: (settings: GeneralSettings | undefined) => void
  getIsDirty: () => boolean
}

export const GeneralSettingsContext = createContext<IGeneralSettingsContext | undefined>(undefined)
export interface IGeneralSettingsProviderProps {
  generalSettings: GeneralSettings | undefined
  children: React.ReactNode
}

interface State {
  // The server data this state was seeded from, kept by reference so a
  // completed fetch re-seeds even when it returns identical values.
  baseline: GeneralSettings | undefined
  current: GeneralSettings | undefined
}

export const GeneralSettingsProvider = (props: IGeneralSettingsProviderProps): React.JSX.Element => {
  const [state, setState] = useState<State>({
    baseline: props.generalSettings,
    current: props.generalSettings
  })

  // Re-seed while rendering, not from an effect: the post-save refetch remounts
  // the form, and an effect would seed it one render late with the old data.
  if (state.baseline !== props.generalSettings) {
    setState({ baseline: props.generalSettings, current: props.generalSettings })
  }

  const updateGeneralSettings = (settings: GeneralSettings | undefined): void => {
    /* eslint-disable  @typescript-eslint/consistent-type-assertions */
    setState((old) => ({
      baseline: old.baseline,
      current: {
        ...old.current,
        ...settings
      } as GeneralSettings
    }))
    /* eslint-enable  @typescript-eslint/consistent-type-assertions */
  }

  const getIsDirty = (): boolean => {
    return !isEqual(state.current ?? {}, state.baseline ?? {})
  }

  return useMemo(() => (
    <GeneralSettingsContext.Provider value={ { generalSettings: state.current, setGeneralSettings: updateGeneralSettings, getIsDirty } }>
      {props.children}
    </GeneralSettingsContext.Provider>
  ), [state, props.children])
}

export const useGeneralSettings = (): IGeneralSettingsContext => {
  const context = useContext(GeneralSettingsContext)

  if (context === undefined) {
    throw new Error('useGeneralSettings must be used within a GeneralSettingsProvider')
  }

  return context
}
