import {IAssetTab} from "@Pimcore/modules/tab-manager/interface/types/IAssetTab";
import {ITab} from "@Pimcore/modules/tab-manager/interface/ITab";

export interface ITabManager {
    type: string
    tabs: ITab[]
}
