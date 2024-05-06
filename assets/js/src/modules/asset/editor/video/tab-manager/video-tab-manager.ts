import { TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import { type IAssetEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IAssetEditorTabManager'

export class VideoTabManager extends TabManager implements IAssetEditorTabManager {
  constructor () {
    super()
    this.type = 'image'
  }
}
