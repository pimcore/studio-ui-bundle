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
import { type ScheduledblockValue } from '../scheduledblock-editable'
import { scheduledblockValueUtils } from './scheduledblock-utils'
import { AbstractBlockManager } from '../../../managers/abstract-block-manager'

/**
 * ScheduledblockManager class handles all DOM operations and element key management
 * for scheduledblock editables. It provides a centralized way to interact with scheduledblock
 * elements without needing to pass container and editableName repeatedly.
 */
export class ScheduledblockManager extends AbstractBlockManager {
  protected getEditableType (): string {
    return 'scheduledblock'
  }

  protected getElementSelector (): string {
    return '.pimcore_block_entry'
  }

  findElementIndex (targetElement: HTMLElement): number {
    const elements = this.queryElements()
    return elements.findIndex(element => element === targetElement)
  }

  ensureElementKey (element: HTMLElement): void {
    const key = this.getElementKey(element)
    if (isNil(key)) {
      const nextKey = this.calculateNextKey()
      this.setElementKey(element, nextKey.toString())
    }
  }

  ensureAllElementKeys (): HTMLElement[] {
    const elements = this.queryElements()
    elements.forEach(element => this.ensureElementKey(element))
    return elements
  }

  getScheduledblockValue (): ScheduledblockValue {
    const elements = this.queryElements()
    return scheduledblockValueUtils.elementsToScheduledblockValue(elements)
  }

  getElementDate (element: HTMLElement): number | null {
    const dateStr = element.getAttribute('date')
    return dateStr !== null ? parseInt(dateStr, 10) : null
  }

  setElementDate (element: HTMLElement, date: number): void {
    element.setAttribute('date', date.toString())
  }

  findElementByDate (date: number): HTMLElement | null {
    const elements = this.queryElements()
    return elements.find(element => this.getElementDate(element) === date) ?? null
  }
}
