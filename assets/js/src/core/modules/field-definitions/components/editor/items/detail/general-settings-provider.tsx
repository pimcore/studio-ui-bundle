/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type GeneralSettings = Record<string, unknown>

export interface IGeneralSettingsContext {
  generalSettings: GeneralSettings | undefined
  setGeneralSettings: (settings: GeneralSettings | undefined) => void
}

export const GeneralSettingsContext = createContext<IGeneralSettingsContext | undefined>(undefined)
export interface IGeneralSettingsProviderProps {
  generalSettings: GeneralSettings | undefined
  children: React.ReactNode
}

export const GeneralSettingsProvider = (props: IGeneralSettingsProviderProps): React.JSX.Element => {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings | undefined>(props.generalSettings)

  useEffect(() => {
    setGeneralSettings(props.generalSettings)
  }, [props.generalSettings])

  const updateGeneralSettings = (settings: GeneralSettings | undefined): void => {
    /* eslint-disable  @typescript-eslint/consistent-type-assertions */
    setGeneralSettings((oldSettings) => {
      return {
        ...oldSettings,
        ...settings
      } as GeneralSettings
    })
    /* eslint-enable  @typescript-eslint/consistent-type-assertions */
  }

  return useMemo(() => (
    <GeneralSettingsContext.Provider value={ { generalSettings, setGeneralSettings: updateGeneralSettings } }>
      {props.children}
    </GeneralSettingsContext.Provider>
  ), [generalSettings, props.children])
}

export const useGeneralSettings = (): IGeneralSettingsContext => {
  const context = useContext(GeneralSettingsContext)

  if (context === undefined) {
    throw new Error('useGeneralSettings must be used within a GeneralSettingsProvider')
  }

  return context
}
