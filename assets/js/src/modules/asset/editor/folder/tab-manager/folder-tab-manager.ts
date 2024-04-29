import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import { injectable } from 'inversify'

@injectable()
export class FolderTabManager extends TabManager {
  constructor () {
    super()
    this.type = 'folder'
  }
}
