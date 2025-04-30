/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type MutableRefObject, useEffect } from 'react'

export const useClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: MouseEvent) => void,
  selectors?: string
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      if (selectors !== undefined) {
        const domElements = document.querySelectorAll(selectors)

        for (const item of domElements) {
          if (item.contains(event.target as HTMLElement)) {
            return
          }
        }
      }

      if (ref.current?.menu?.list?.contains(event.target as Node) === true) {
        return
      }

      if (ref.current?.nativeElement?.contains(event.target) === true) {
        return
      }

      handler(event)
    }
    document.addEventListener('mousedown', listener, true)
    return () => {
      document.removeEventListener('mousedown', listener, true)
    }
  }, [ref, handler])
}
