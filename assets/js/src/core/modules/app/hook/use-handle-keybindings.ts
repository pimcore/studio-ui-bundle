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

export const useHandleKeyBindings = (callback, actionName): void => {
  const { user } = useUserDraft()
  console.log(user?.keyBindings)

  const getConfigByactionName = (actionName: string): KeyBindingForAUser | undefined => {
    if (!user?.keyBindings) {
      return undefined
    }

    return user.keyBindings.find((binding: KeyBindingForAUser) => binding.action === actionName) || undefined
  }

  // const targetElement = config.shortcutTarget || document
  const targetElement = document

  const eventHandler = useCallback((evt: KeyboardEvent) => {
    const config = getConfigByactionName(actionName)
    const { keyCode, ctrlKey, altKey, shiftKey } = evt

    if (config?.key !== undefined && config.key === keyCode && config.ctrl === ctrlKey && config.shift === shiftKey && config.alt === altKey) {
      evt.preventDefault()
      callback(evt)
    }
  }, [callback, actionName])

  useEffect(() => {
    targetElement.addEventListener('keydown', eventHandler)
    return () => { targetElement.removeEventListener('keydown', eventHandler) }
  }, [targetElement, eventHandler])

  // const location = useLocation()
  //
  // console.log('location', location)
}
