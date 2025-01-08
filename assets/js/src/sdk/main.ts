/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

// App
export { type ModuleSystem, type AbstractModule } from '@Pimcore/app/module-system/module-system'
export { type PluginSystem, type IAbstractPlugin } from '@Pimcore/app/plugin-system/plugin-system'
export { IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'

// Components
export { Background } from '@Pimcore/components/background/background'
export { Dropdown } from '@Pimcore/components/dropdown/dropdown'
export { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
export { Icon, type IconProps } from '@Pimcore/components/icon/icon'

// Modules
export { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
export { type Widget, WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'

export type * from '@Pimcore/modules/asset/asset-api-slice.gen'
export { useAssetGetByIdQuery, useAssetGetTreeQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'
export { FolderTabManager } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/folder-tab-manager'
export { AssetContext, AssetProvider, type IAssetContext, type IAssetProviderProps } from '@Pimcore/modules/asset/asset-provider'
export type { IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'

export const Pimcore = window.Pimcore
export const container = window.Pimcore.container
export const serviceIds = window.Pimcore.serviceIds
