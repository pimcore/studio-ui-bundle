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

/**
 * Interface for block-like managers (block, areablock, etc.)
 */
export interface BlockManagerInterface {
  getContainer: () => HTMLElement | null
  getEditableName: () => string
  getRealEditableName: () => string
  queryElements: () => HTMLElement[]
  findElementIndex: (element: HTMLElement) => number
  findElementByKey: (key: string) => HTMLElement | null
  getElementKey: (element: HTMLElement) => string | null
  setElementKey: (element: HTMLElement, key: string) => void
  parseElementKey: (element: HTMLElement) => number
  calculateNextKey: () => number
  ensureAllElementKeys: () => HTMLElement[]
  getElementType?: (element: HTMLElement) => string | null
}

export abstract class AbstractBlockManager implements BlockManagerInterface {
  protected readonly container: HTMLElement | null
  protected readonly editableName: string

  constructor (editableName: string, containerRef?: React.RefObject<HTMLDivElement>) {
    this.editableName = editableName
    this.container = this.findContainer(containerRef)
  }

  /**
   * Finds the container element via React ref or DOM query
   */
  private findContainer (containerRef?: React.RefObject<HTMLDivElement>): HTMLElement | null {
    if (!isNil(containerRef?.current)) {
      return containerRef.current
    }

    const element = document.querySelector(`[data-name="${this.editableName}"][data-type="${this.getEditableType()}"]`)
    return element as HTMLElement
  }

  /**
   * Returns the editable type (e.g., "block", "areablock")
   */
  protected abstract getEditableType (): string

  /**
   * Returns the element selector (e.g., ".pimcore_block_entry")
   */
  protected abstract getElementSelector (): string

  getContainer (): HTMLElement | null {
    return this.container
  }

  getEditableName (): string {
    return this.editableName
  }

  getRealEditableName (): string {
    return this.container?.getAttribute('data-real-name') ?? this.editableName
  }

  queryElements (): HTMLElement[] {
    if (isNil(this.container)) return []

    return Array.from(this.container.querySelectorAll(this.getElementSelector()))
  }

  findElementIndex (element: HTMLElement): number {
    const elements = this.queryElements()
    return elements.indexOf(element)
  }

  findElementByKey (key: string): HTMLElement | null {
    const elements = this.queryElements()
    return elements.find(el => this.getElementKey(el) === key) ?? null
  }

  getElementKey (element: HTMLElement): string | null {
    return element.getAttribute('key')
  }

  setElementKey (element: HTMLElement, key: string): void {
    element.setAttribute('key', key)
  }

  parseElementKey (element: HTMLElement): number {
    const key = this.getElementKey(element)
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

  ensureAllElementKeys (): HTMLElement[] {
    const elements = this.queryElements()

    elements.forEach(element => {
      const key = this.getElementKey(element)
      if (isNil(key) || key === '') {
        this.setElementKey(element, this.calculateNextKey().toString())
      }
    })

    return elements
  }
}
