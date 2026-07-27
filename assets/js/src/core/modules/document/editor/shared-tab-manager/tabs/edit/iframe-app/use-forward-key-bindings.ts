/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'

export const cloneKeyDownEvent = (evt: KeyboardEvent): KeyboardEvent => {
  const clone = new KeyboardEvent('keydown', {
    key: evt.key,
    code: evt.code,
    location: evt.location,
    ctrlKey: evt.ctrlKey,
    shiftKey: evt.shiftKey,
    altKey: evt.altKey,
    metaKey: evt.metaKey,
    repeat: evt.repeat,
    bubbles: true,
    cancelable: true
  })

  // The KeyboardEvent constructor drops keyCode (always 0), but the global
  // key-binding matcher still compares against it, so restore it explicitly.
  Object.defineProperty(clone, 'keyCode', { value: evt.keyCode })

  return clone
}

export const forwardKeyDownEvents = (source: Document, target: Document): (() => void) => {
  // Same document → nothing to forward, and guards against infinite re-dispatch.
  if (source === target) {
    return () => {}
  }

  const handleKeyDown = (evt: KeyboardEvent): void => {
    const notCancelled = target.dispatchEvent(cloneKeyDownEvent(evt))

    // A parent binding consumed it → suppress the original browser default too.
    if (!notCancelled) {
      evt.preventDefault()
    }
  }

  source.addEventListener('keydown', handleKeyDown)

  return () => {
    source.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Bridges keyboard shortcuts pressed inside the document editor iframe to the
 * top-level document, where the global key-binding listeners are attached.
 * Without it, shortcuts (Publish, Refresh, …) triggered while focus is inside
 * the iframe fall through to the browser default action.
 */
export const useForwardKeyBindings = (): void => {
  useEffect(() => {
    if (window.parent === window.self) {
      return
    }

    return forwardKeyDownEvents(document, window?.parent?.document)
  }, [])
}
