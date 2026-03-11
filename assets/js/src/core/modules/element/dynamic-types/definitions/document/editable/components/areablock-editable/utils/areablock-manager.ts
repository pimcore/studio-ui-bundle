/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AreablockValue } from '../areablock-editable'
import { AbstractBlockManager } from '../../../managers/abstract-block-manager'

export class AreablockManager extends AbstractBlockManager {
  protected getEditableType (): string {
    return 'areablock'
  }

  protected getElementSelector (): string {
    return `.pimcore_area_entry[data-name="${this.editableName}"]`
  }

  getElementType (element: HTMLElement): string | null {
    return element.getAttribute('type')
  }

  setElementType (element: HTMLElement, type: string): void {
    element.setAttribute('type', type)
  }

  getAreablockValue (): AreablockValue {
    const elements = this.ensureAllElementKeys()
    return elements.map(element => {
      const key = this.getElementKey(element)
      const type = this.getElementType(element)
      const hidden = this.isElementHidden(element)

      return {
        key: key ?? '',
        type: type ?? '',
        hidden
      }
    })
  }

  isElementHidden (element: HTMLElement): boolean {
    return element.getAttribute('data-hidden') === 'true'
  }

  setElementHidden (element: HTMLElement, hidden: boolean): void {
    if (hidden) {
      element.setAttribute('data-hidden', 'true')
    } else {
      element.removeAttribute('data-hidden')
    }
  }

  toggleElementHidden (element: HTMLElement): boolean {
    const isHidden = this.isElementHidden(element)
    this.setElementHidden(element, !isHidden)
    return !isHidden
  }

  applyStylestoAreaEntries (areaEntryClass: string): void {
    const elements = this.queryElements()
    elements.forEach(element => {
      element.classList.add(areaEntryClass)
    })
  }
}
