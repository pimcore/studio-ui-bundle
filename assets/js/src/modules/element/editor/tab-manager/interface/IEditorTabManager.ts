import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'

export interface IEditorTabManager {
  type: string
  tabs: IEditorTab[]
}
