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
import { type AreablockValue } from '../areablock-editable'

export class AreablockManager {
  private readonly editableName: string
  private readonly containerRef?: React.RefObject<HTMLDivElement>

  constructor (editableName: string, containerRef?: React.RefObject<HTMLDivElement>) {
    this.editableName = editableName
    this.containerRef = containerRef
  }

  getContainer (): HTMLDivElement | null {
    return this.containerRef?.current ?? null
  }

  getEditableName (): string {
    return this.editableName
  }

  queryElements (): HTMLElement[] {
    const container = this.getContainer()
    if (isNil(container)) return []

    return Array.from(container.querySelectorAll('.pimcore_area_entry'))
  }

  findElementIndex (element: HTMLElement): number {
    const elements = this.queryElements()
    return elements.indexOf(element)
  }

  getElementKey (element: HTMLElement): string | null {
    return element.getAttribute('key')
  }

  getElementType (element: HTMLElement): string | null {
    return element.getAttribute('type')
  }

  setElementKey (element: HTMLElement, key: string): void {
    element.setAttribute('key', key)
  }

  setElementType (element: HTMLElement, type: string): void {
    element.setAttribute('type', type)
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

  getAreablockValue (): AreablockValue {
    const elements = this.ensureAllElementKeys()

    return elements.map(element => {
      const key = this.getElementKey(element)
      const type = this.getElementType(element)
      const hidden = element.getAttribute('data-hidden') === 'true'

      return {
        key: key ?? '',
        type: type ?? '',
        hidden
      }
    })
  }
}
