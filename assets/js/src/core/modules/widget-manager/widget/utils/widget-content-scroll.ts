/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { WIDGET_CONTENT_CLASS } from '../widget-view'

export function scrollToNodeElement (nodeElement: HTMLElement): void {
  const scrollContainer: HTMLElement | null = nodeElement.closest('.' + WIDGET_CONTENT_CLASS)

  if (!isNil(scrollContainer)) {
    const containerRect = scrollContainer.getBoundingClientRect()
    const nodeRect = nodeElement.getBoundingClientRect()
    const elementOffsetTop = nodeRect.top - containerRect.top + scrollContainer.scrollTop
    const currentScrollTop = scrollContainer.scrollTop

    if (containerRect.height === 0) {
      return
    }

    const scrollbarHeight = scrollContainer.offsetHeight - scrollContainer.clientHeight

    const scrollToTop = (): void => {
      scrollContainer.scrollTo({
        top: elementOffsetTop,
        behavior: 'smooth'
      })
    }

    const scrollToBottom = (): void => {
      scrollContainer.scrollTo({
        top: elementOffsetTop - containerRect.height + nodeRect.height + scrollbarHeight,
        behavior: 'smooth'
      })
    }

    if (elementOffsetTop < currentScrollTop) {
      // Element is above the visible area
      scrollToTop()
    } else if (elementOffsetTop + nodeRect.height > currentScrollTop + containerRect.height - scrollbarHeight) {
      // Element is below the visible area
      scrollToBottom()
    }
  }
}
