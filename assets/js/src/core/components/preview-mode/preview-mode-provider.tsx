/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

export interface PreviewModeItem {
  elementType?: string
  data: {
    id?: string | number
    fullpath?: string
    [key: string]: any
  }
}

export interface PreviewModeFallbackItem {
  id: string | number
  fullpath?: string
}

export interface PreviewModeContextValue {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  /** The item the user picked, or null */
  item: PreviewModeItem | null
  setItem: (item: PreviewModeItem | null) => void
  /** Used by the bar while nothing is picked */
  fallbackItem: PreviewModeFallbackItem | null
  /** Language of the column previews, set by the bar's language switch; undefined = the current language */
  language: string | undefined
  setLanguage: (language: string) => void
}

const defaultValue: PreviewModeContextValue = {
  enabled: false,
  setEnabled: () => {},
  item: null,
  setItem: () => {},
  fallbackItem: null,
  language: undefined,
  setLanguage: () => {}
}

export const PreviewModeContext = createContext<PreviewModeContextValue | undefined>(undefined)

export interface PreviewModeProviderProps {
  children?: React.ReactNode
  defaultEnabled?: boolean
  fallbackItem?: PreviewModeFallbackItem | null
  /** The picked item is cleared whenever this value changes */
  resetKey?: unknown
}

export const PreviewModeProvider = ({
  children,
  defaultEnabled = false,
  fallbackItem = null,
  resetKey
}: PreviewModeProviderProps): React.JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(defaultEnabled)
  const [item, setItem] = useState<PreviewModeItem | null>(null)
  const [language, setLanguage] = useState<string | undefined>(undefined)
  const lastResetKey = useRef(resetKey)

  useEffect(() => {
    if (lastResetKey.current !== resetKey) {
      lastResetKey.current = resetKey
      setItem(null)
    }
  }, [resetKey])

  const value = useMemo(
    () => ({ enabled, setEnabled, item, setItem, fallbackItem, language, setLanguage }),
    [enabled, item, language, fallbackItem?.id, fallbackItem?.fullpath]
  )

  return <PreviewModeContext.Provider value={ value }>{children}</PreviewModeContext.Provider>
}

export const usePreviewMode = (): PreviewModeContextValue => {
  const context = useContext(PreviewModeContext)
  if (context === undefined) {
    throw new Error('usePreviewMode must be used within a PreviewModeProvider')
  }
  return context
}

/** Returns an inactive preview mode when no provider is mounted */
export const usePreviewModeOptional = (): PreviewModeContextValue => {
  return useContext(PreviewModeContext) ?? defaultValue
}
