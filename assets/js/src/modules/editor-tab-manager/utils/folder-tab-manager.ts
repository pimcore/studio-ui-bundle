import { EditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/editor-tab-manager'

export class FolderEditorTabManager extends EditorTabManager {
  constructor () {
    super()
    this.type = 'folder'
  }
}
