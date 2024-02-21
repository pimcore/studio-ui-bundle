import {IEditorTab} from "@Pimcore/modules/editor-tab-manager/interface/IEditorTab";

export interface IEditorTabManager {
    type: string
    tabs: IEditorTab[]
}
