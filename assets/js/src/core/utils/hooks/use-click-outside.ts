/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import {DOMElement, type MutableRefObject, useEffect} from 'react'

export const useClickOutside = (
  ref: MutableRefObject<any>,
  handler: (event: MouseEvent) => void,
  selectors: string
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
        const domElements = document.querySelectorAll(selectors)

        for (let item of domElements) {
          if (item.contains(event.target as HTMLElement)) {
            return
          }
        }

        if (ref.current === null || ref.current.nativeElement.contains(event.target) === true) {
          return
        }

        handler(event)
    }
    document.addEventListener('mousedown', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
    }
  }, [ref, handler])
}
