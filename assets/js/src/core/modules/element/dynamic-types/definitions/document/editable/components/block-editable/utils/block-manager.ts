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
    // match on `data-key` (robust mirror of `key`, always emitted by the backend);
    // `key` can be stripped downstream, which would make managed entries invisible
    // and silently drop their child editables on save
    return `.pimcore_block_entry[data-name="${this.editableName}"][data-key]`
  }

  findElementIndex (targetElement: HTMLElement): number {
    const elements = this.queryElements()
    if (elements.length === 0) return -1

    const targetKey = this.getElementKey(targetElement)
    return elements.findIndex(element => this.getElementKey(element) === targetKey)
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
