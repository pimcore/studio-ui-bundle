import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'

export class FolderTabManager extends TabManager {
  constructor () {
    super()
    this.type = 'folder'
  }
}
