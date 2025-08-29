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
import { AbstractBlockManager } from '../../../managers/abstract-block-manager'

/**
 * BlockManager class handles all DOM operations and element key management
 * for block editables. It provides a centralized way to interact with block
 * elements without needing to pass container and editableName repeatedly.
 */
export class BlockManager extends AbstractBlockManager {
  protected getEditableType (): string {
    return 'block'
  }

  protected getElementSelector (): string {
    return `.pimcore_block_entry[data-name="${this.editableName}"][key]`
  }

  findElementIndex (targetElement: HTMLElement): number {
    const elements = this.queryElements()
    if (elements.length === 0) return -1

    const targetKey = targetElement.getAttribute('key')
    return elements.findIndex(element => element.getAttribute('key') === targetKey)
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

  getBlockValue (): BlockValue {
    const elements = this.queryElements()
    return blockValueUtils.elementsToBlockValue(elements)
  }
}
