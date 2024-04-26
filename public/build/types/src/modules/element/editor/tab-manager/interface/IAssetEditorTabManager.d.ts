import { type IAssetEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/types/IAssetEditorTab';
import { type IEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTabManager';
export interface IAssetEditorTabManager extends IEditorTabManager {
    tabs: IAssetEditorTab[];
    getTabs: () => IAssetEditorTab[];
    getTab: (key: string) => IAssetEditorTab | undefined;
    register: (tab: IAssetEditorTab) => void;
}
//# sourceMappingURL=IAssetEditorTabManager.d.ts.map