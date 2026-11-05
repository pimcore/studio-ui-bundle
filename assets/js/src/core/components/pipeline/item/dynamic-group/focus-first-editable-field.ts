/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const EDITABLE_FIELD_SELECTOR = '[contenteditable="true"], input, textarea'

/**
 * Puts the cursor in the first field of a pipeline item a user can actually type in.
 *
 * A pipeline item opens with a hidden input holding its type, and a hidden field still answers a
 * plain selector, so the candidates are walked until one of them is rendered and editable. The code
 * editors are built on CodeMirror and are reached through its contenteditable element.
 */
export const focusFirstEditableField = (container: HTMLElement): void => {
  const candidates = Array.from(container.querySelectorAll<HTMLElement>(EDITABLE_FIELD_SELECTOR))

  candidates.find(isEditable)?.focus({ preventScroll: true })
}

const isEditable = (element: HTMLElement): boolean => {
  if (element instanceof HTMLInputElement && element.type === 'hidden') {
    return false
  }

  if ((element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) &&
      (element.disabled || element.readOnly)) {
    return false
  }

  return isRendered(element)
}

/** A field inside a hidden wrapper is not on the page, and focusing it would do nothing. */
const isRendered = (element: HTMLElement): boolean => {
  let current: HTMLElement | null = element

  while (current !== null) {
    const { display, visibility } = window.getComputedStyle(current)

    if (current.hidden || display === 'none' || visibility === 'hidden') {
      return false
    }

    current = current.parentElement
  }

  return true
}
