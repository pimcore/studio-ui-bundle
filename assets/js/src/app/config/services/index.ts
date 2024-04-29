import { container } from '@Pimcore/app/depency-injection'
import { FolderTabManager } from '@Pimcore/modules/asset/editor/folder/tab-manager/folder-tab-manager'
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'

export const serviceIds = {
  widgetManager: Symbol('widgetManagerService'),

  // Asset tab managers
  'Asset/Editor/FolderTabManager': Symbol('Asset/Editor/FolderTabManager')
}

container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()

// Asset tab managers
container.bind(serviceIds['Asset/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
