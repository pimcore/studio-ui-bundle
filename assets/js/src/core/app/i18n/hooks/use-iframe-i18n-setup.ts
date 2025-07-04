/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import { initializeIframeI18n } from '@Pimcore/app/i18n/iframe-i18n'

export interface UseIframeI18nSetupReturn {
  isInitialized: boolean
  error: Error | null
}

/**
 * Hook to handle i18n initialization for iframe components
 * Ensures translations are loaded from parent window before rendering
 */
export const useIframeI18nSetup = (): UseIframeI18nSetupReturn => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initI18n = async (): Promise<void> => {
      try {
        await initializeIframeI18n()
        setIsInitialized(true)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize iframe i18n')
        console.error('Failed to initialize iframe i18n:', error)
        setError(error)
        setIsInitialized(true) // Continue anyway with fallback
      }
    }

    void initI18n()
  }, [])

  return { isInitialized, error }
}
