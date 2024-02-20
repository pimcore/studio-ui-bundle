import { TabManager } from '@Pimcore/modules/tab-manager/utils/tab-manager'
import { type IAssetTabManager } from '@Pimcore/modules/tab-manager/interface/IAssetTabManager'

export class AssetTabManager extends TabManager implements IAssetTabManager {
  constructor () {
    super()
    this.type = 'asset'
  }
}
