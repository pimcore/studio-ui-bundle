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
import { type BlockValue } from '../block-editable'
import { blockValueUtils } from './block-utils'

/**
 * BlockManager class handles all DOM operations and element key management
 * for block editables. It provides a centralized way to interact with block
 * elements without needing to pass container and editableName repeatedly.
 */
export class BlockManager {
  private readonly container: HTMLElement | null
  private readonly editableName: string

  constructor (editableName: string, containerRef?: React.RefObject<HTMLDivElement>) {
    this.editableName = editableName
    this.container = this.findContainer(containerRef)
  }

  private findContainer (containerRef?: React.RefObject<HTMLDivElement>): HTMLElement | null {
    if (!isNil(containerRef?.current)) {
      return containerRef.current
    }

    const element = document.querySelector(`[data-name="${this.editableName}"][data-type="block"]`)
    return element as HTMLElement
  }

  queryElements (): HTMLElement[] {
    if (isNil(this.container)) return []

    const selector = `.pimcore_block_entry[data-name="${this.editableName}"][key]`
    return Array.from(this.container.querySelectorAll(selector))
  }

  findElementIndex (targetElement: HTMLElement): number {
    const elements = this.queryElements()
    if (elements.length === 0) return -1

    const targetKey = targetElement.getAttribute('key')
    return elements.findIndex(element => element.getAttribute('key') === targetKey)
  }

  getElementKey (element: HTMLElement): string | null {
    return element.getAttribute('key')
  }

  setElementKey (element: HTMLElement, key: string): void {
    element.setAttribute('key', key)
  }

  ensureElementKey (element: HTMLElement): void {
    const key = this.getElementKey(element)
    if (isNil(key) || key === '') {
      this.setElementKey(element, '0')
    }
  }

  ensureAllElementKeys (): HTMLElement[] {
    const elements = this.queryElements()
    elements.forEach(element => { this.ensureElementKey(element) })
    return elements
  }

  parseElementKey (element: HTMLElement): number {
    const key = element.getAttribute('key')
    return parseInt(key ?? '0', 10)
  }

  calculateNextKey (): number {
    const elements = this.queryElements()
    if (elements.length === 0) return 1

    let nextKey = 0

    for (const element of elements) {
      const currentKey = this.parseElementKey(element)
      if (currentKey > nextKey) {
        nextKey = currentKey
      }
    }

    return nextKey + 1
  }

  getBlockValue (): BlockValue {
    const elements = this.queryElements()
    return blockValueUtils.elementsToBlockValue(elements)
  }

  getContainer (): HTMLElement | null {
    return this.container
  }

  getEditableName (): string {
    return this.editableName
  }

  getRealEditableName (): string {
    return this.container?.getAttribute('data-real-name') ?? this.editableName
  }
}
