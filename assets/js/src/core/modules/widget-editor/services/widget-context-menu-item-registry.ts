/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export interface ElementTreeWidgetPermissionItem {
  key: string
  priority: number
}

export interface IElementTreeWidgetPermissionRegistry {
  registerItem: (elementType: ElementType, item: ElementTreeWidgetPermissionItem) => void
  getItems: (elementType: ElementType) => string[]
}

@injectable()
export class ElementTreeWidgetPermissionRegistry implements IElementTreeWidgetPermissionRegistry {
  private readonly items: Record<ElementType, ElementTreeWidgetPermissionItem[]> = {
    asset: [],
    'data-object': [],
    document: []
  }

  registerItem (elementType: ElementType, item: ElementTreeWidgetPermissionItem): void {
    const existingIndex = this.items[elementType].findIndex((existing) => existing.key === item.key)

    if (existingIndex !== -1) {
      this.items[elementType][existingIndex] = item
    } else {
      this.items[elementType].push(item)
    }

    this.items[elementType].sort((a, b) => a.priority - b.priority)
  }

  getItems (elementType: ElementType): string[] {
    return this.items[elementType].map((item) => item.key)
  }
}
