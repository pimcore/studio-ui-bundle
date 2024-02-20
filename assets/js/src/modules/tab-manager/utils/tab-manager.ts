import { type ITabManager } from '@Pimcore/modules/tab-manager/interface/ITabManager'
import { type ITab } from '@Pimcore/modules/tab-manager/interface/ITab'

export abstract class TabManager implements ITabManager {
  type: string = ''
  tabs: ITab[] = []

  getTabs (): ITab[] {
    return this.tabs
  }

  getTab (key: string): ITab | undefined {
    return this.tabs.find((tab) => tab.key === key)
  }

  register (tab: ITab): void {
    if (this.getTab(tab.key) !== undefined) {
      this.tabs.splice(this.tabs.findIndex((t) => t.key === tab.key), 1, tab)
      return
    }

    this.tabs.push(tab)
  }
}
