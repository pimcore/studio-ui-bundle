/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { isNull, isUndefined } from 'lodash'
import { useWidgetManager } from './use-widget-manager'

const pressedMainTabId = (target: EventTarget | null): string | undefined => {
  if (!(target instanceof Element) || !isNull(target.closest('button'))) {
    return undefined
  }

  return target.closest('.flexlayout__tab_button')?.querySelector<HTMLElement>('.widget-manager__main-tab-title')?.dataset.tabId
}

// flexlayout's drag glass swallows the dblclick event, so the second press on the same main tab carries the click count
export const useExpandOnDoubleClick = (): void => {
  const { expandMainWidget } = useWidgetManager()
  const previousTabId = useRef<string | undefined>(undefined)

  useEffect(() => {
    const onPress = (event: MouseEvent): void => {
      const tabId = pressedMainTabId(event.target)
      const isDoubleClick = event.button === 0 && event.detail === 2 && !isUndefined(tabId) && tabId === previousTabId.current
      previousTabId.current = tabId

      if (isDoubleClick) {
        expandMainWidget(tabId)
      }
    }

    document.addEventListener('mousedown', onPress, true)

    return () => {
      document.removeEventListener('mousedown', onPress, true)
    }
  }, [expandMainWidget])
}
