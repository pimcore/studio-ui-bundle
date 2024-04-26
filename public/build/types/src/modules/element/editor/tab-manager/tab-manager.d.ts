import { type IEditorTabManager } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTabManager';
import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab';
export declare abstract class TabManager implements IEditorTabManager {
    type: string;
    tabs: IEditorTab[];
    getTabs(): IEditorTab[];
    getTab(key: string): IEditorTab | undefined;
    register(tab: IEditorTab): void;
}
//# sourceMappingURL=tab-manager.d.ts.map