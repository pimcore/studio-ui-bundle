import {IAssetTab} from "@Pimcore/modules/tab-manager/interface/types/IAssetTab";
import {ITabManager} from "@Pimcore/modules/tab-manager/interface/ITabManager";

export interface IAssetTabManager extends ITabManager {
    tabs: IAssetTab[]
    getTabs(): IAssetTab[]
    getTab(key: string): IAssetTab | undefined
    register(tab: IAssetTab): void
}
