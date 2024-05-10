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
export { ModuleSystem, type AbstractModule } from '../core/app/module-system/module-system';
export { PluginSystem, type abstractPlugin } from '../core/app/plugin-system/plugin-system';
export { IconLibrary } from '../core/modules/icon-library/services/icon-library';
export { Background } from '../core/components/background/background';
export { type IconProps as DropdownIconProps, DropdownMenu, type DropdownMenuItemProps } from '../core/components/dropdown-menu/dropdown-menu';
export { PimcoreImage } from '../core/components/pimcore-image/pimcore-image';
export { Icon, type IconProps } from '../core/components/icon/icon';
export { useWidgetManager } from '../core/modules/widget-manager/hooks/use-widget-manager';
export { type Widget, WidgetRegistry } from '../core/modules/widget-manager/services/widget-registry';
export type * from '../core/modules/asset/asset-api-slice.gen';
export { useGetAssetByIdQuery, useGetAssetsQuery } from '../core/modules/asset/asset-api-slice.gen';
export { FolderTabManager } from '../core/modules/asset/editor/folder/tab-manager/folder-tab-manager';
export { AssetContext, AssetProvider, type IAssetContext, type IAssetProviderProps } from '../core/modules/asset/asset-provider';
export type { IEditorTab } from '../core/modules/element/editor/tab-manager/interface/IEditorTab';
export declare const Pimcore: import("../core/app/public-api").PublicApi;
export declare const container: import("inversify/lib/container/container").Container;
export declare const serviceIds: {
    widgetManager: string;
    'Asset/Editor/ComponentRegistry': string;
    'Asset/Editor/FolderTabManager': string;
    iconLibrary: string;
};
//# sourceMappingURL=main.d.ts.map