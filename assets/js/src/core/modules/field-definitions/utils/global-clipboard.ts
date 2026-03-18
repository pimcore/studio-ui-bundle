/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Layout } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { useEffect, useReducer } from 'react'

// Module-level singleton — shared across all React widget trees
let copiedLayout: Layout | undefined
const listeners = new Set<() => void>()

const notifyListeners = (): void => {
  listeners.forEach((fn) => { fn() })
}

export const globalFieldDefinitionClipboard = {
  get: (): Layout | undefined => copiedLayout,

  set: (layout: Layout | undefined): void => {
    copiedLayout = layout
    notifyListeners()
  },

  clear: (): void => {
    copiedLayout = undefined
    notifyListeners()
  },

  subscribe: (fn: () => void): (() => void) => {
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  }
}

export const useGlobalFieldDefinitionClipboard = (): {
  copiedLayout: Layout | undefined
  setCopiedLayout: (layout: Layout | undefined) => void
  clearClipboard: () => void
} => {
  const [, rerender] = useReducer((x: number) => x + 1, 0)

  useEffect(() => {
    return globalFieldDefinitionClipboard.subscribe(rerender)
  }, [])

  return {
    copiedLayout: globalFieldDefinitionClipboard.get(),
    setCopiedLayout: globalFieldDefinitionClipboard.set,
    clearClipboard: globalFieldDefinitionClipboard.clear
  }
}
