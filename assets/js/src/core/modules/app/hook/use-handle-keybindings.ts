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
import {useWidgetManager} from "@Pimcore/modules/widget-manager/hooks/use-widget-manager";

export const useHandleKeyBindings = (callback, actionName, enabled = true): void => {
  const { user } = useUserDraft()
  const { getOpenedMainWidget } = useWidgetManager()

  const getConfigByactionName = (actionName: string): KeyBindingForAUser | undefined => {
    if (!user?.keyBindings) {
      return undefined
    }

    return user.keyBindings.find((binding: KeyBindingForAUser) => binding.action === actionName) || undefined
  }

  const eventHandler = useCallback((evt: KeyboardEvent) => {
    //skip shortcuts in user profile and user-management
    if (evt.target instanceof HTMLInputElement && (getOpenedMainWidget()?.getComponent() === 'user-profile' || getOpenedMainWidget()?.getComponent() === 'user-management')) {
      return
    }

    const config = getConfigByactionName(actionName)
    const { key, ctrlKey, altKey, shiftKey } = evt;

    if (config?.key !== undefined && config.key === key && config.ctrl === ctrlKey && config.shift === shiftKey && config.alt === altKey) {
      evt.preventDefault()
      callback(evt)
    }
  }, [callback, actionName])

  useEffect(() => {
    if (!enabled) return
    document.addEventListener('keydown', eventHandler)

    return () => {
      document.removeEventListener('keydown', eventHandler)
    }
  }, [enabled, eventHandler])
}
