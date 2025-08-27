import React from "react"

export interface FieldCollectionRegistryItem {
  type: string
  key: string
  translationKey: string
  component: React.JSX.Element
}

export class FieldCollectionRegistry {
  protected items: FieldCollectionRegistryItem[] = []

  public register(item: FieldCollectionRegistryItem): void {
    this.items.push(item)
  }

  public getItems(): FieldCollectionRegistryItem[] {
    return this.items
  }

  public getItemByType(type: string): FieldCollectionRegistryItem | undefined {
    return this.items.find(item => item.type === type)
  }
}
