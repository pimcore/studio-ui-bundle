import { EditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/editor-tab-manager'
import { type IAssetEditorTabManager } from '@Pimcore/modules/editor-tab-manager/interface/IAssetEditorTabManager'

export class AssetEditorTabManager extends EditorTabManager implements IAssetEditorTabManager {
  constructor () {
    super()
    this.type = 'asset'
  }
}
