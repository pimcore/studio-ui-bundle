/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect } from 'react'
import { useUserDraft } from '@Pimcore/modules/auth/hooks/use-user-draft'
import { type KeyBindingForAUser } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { useIsAcitveMainWidget } from '@Pimcore/modules/widget-manager/hooks/use-is-active-main-widget'
import { useMergedKeyBindings } from '@Pimcore/modules/user/hooks/use-merged-keybindings'
// import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'

export const useHandleKeyBindings = (callback: (evt: KeyboardEvent) => void, actionName: string, alwaysActive = false): void => {
  const isWidgetActive = useIsAcitveMainWidget()
  const { user } = useUserDraft()
  const { mergedKeyBindings } = useMergedKeyBindings(user?.keyBindings)

  // const { getOpenedMainWidget } = useWidgetManager()

  const getConfigByactionName = (actionName: string): KeyBindingForAUser | undefined => {
    return mergedKeyBindings.find((binding: KeyBindingForAUser) => binding.action === actionName)
  }

  const eventHandler = useCallback((evt: KeyboardEvent) => {
    // skip shortcuts in input fields
    if (evt.target instanceof HTMLInputElement) {
      return
    }

    const config = getConfigByactionName(actionName)
    const { keyCode, ctrlKey, altKey, shiftKey } = evt

    if (config?.key !== undefined && config.key === keyCode && config.ctrl === ctrlKey && config.shift === shiftKey && config.alt === altKey) {
      evt.preventDefault()
      callback(evt)
    }
  }, [callback, actionName])

  useEffect(() => {
    document.removeEventListener('keydown', eventHandler)
    if (alwaysActive || isWidgetActive) {
      document.addEventListener('keydown', eventHandler)
      return () => {
        document.removeEventListener('keydown', eventHandler)
      }
    }
  }, [alwaysActive, isWidgetActive, eventHandler])
}
