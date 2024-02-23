import { type IEditorTabManager } from '@Pimcore/modules/editor-tab-manager/interface/IEditorTabManager'
import { type IEditorTab } from '@Pimcore/modules/editor-tab-manager/interface/IEditorTab'

export abstract class EditorTabManager implements IEditorTabManager {
  type: string = ''
  tabs: IEditorTab[] = []

  getTabs (): IEditorTab[] {
    return this.tabs
  }

  getTab (key: string): IEditorTab | undefined {
    return this.tabs.find((tab) => tab.key === key)
  }

  register (tab: IEditorTab): void {
    if (this.getTab(tab.key) !== undefined) {
      this.tabs.splice(this.tabs.findIndex((t) => t.key === tab.key), 1, tab)
      return
    }

    this.tabs.push(tab)
  }
}
