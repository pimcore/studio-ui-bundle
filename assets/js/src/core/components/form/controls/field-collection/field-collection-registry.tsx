/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'

export interface FieldCollectionRegistryItem {
  type: string
  key: string
  translationKey: string
  component: React.JSX.Element
}

export class FieldCollectionRegistry {
  protected items: FieldCollectionRegistryItem[] = []

  public register (item: FieldCollectionRegistryItem): void {
    this.items.push(item)
  }

  public getItems (): FieldCollectionRegistryItem[] {
    return this.items
  }

  public getItemByType (type: string): FieldCollectionRegistryItem | undefined {
    return this.items.find(item => item.type === type)
  }
}
