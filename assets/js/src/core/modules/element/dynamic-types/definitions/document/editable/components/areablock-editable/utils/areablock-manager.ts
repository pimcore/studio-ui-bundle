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
    return '.pimcore_area_entry'
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
      const hidden = element.getAttribute('data-hidden') === 'true'

      return {
        key: key ?? '',
        type: type ?? '',
        hidden
      }
    })
  }
}
