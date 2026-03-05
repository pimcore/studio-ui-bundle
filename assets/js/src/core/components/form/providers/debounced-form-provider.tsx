/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, type ReactNode } from 'react'
import { uuid } from '@Pimcore/utils/uuid'

export interface DebouncedFormContextValue {
  tag: string
}

const DebouncedFormContext = createContext<DebouncedFormContextValue | null>(null)

export interface DebouncedFormProviderProps {
  /**
   * Tag for coordinating flushes across multiple forms. Auto-generated if not provided.
   */
  tag?: string
  children: ReactNode
}

/**
 * Provider for coordinating debounced form changes.
 * Forms inside this provider can be flushed together via `useDebouncedFormFlush()`.
 */
export function DebouncedFormProvider ({
  tag: providedTag,
  children
}: DebouncedFormProviderProps): React.JSX.Element {
  const tag = useMemo(() => providedTag ?? `debounced-form-${uuid()}`, [providedTag])

  const contextValue = useMemo<DebouncedFormContextValue>(() => ({
    tag
  }), [tag])

  return (
    <DebouncedFormContext.Provider value={ contextValue }>
      {children}
    </DebouncedFormContext.Provider>
  )
}

/**
 * Returns the resolved tag from explicit parameter or provider context.
 *
 * Priority: explicitTag → provider tag → undefined
 */
export function useDebouncedFormContext (explicitTag?: string): string | undefined {
  const context = useContext(DebouncedFormContext)
  return explicitTag ?? context?.tag
}
