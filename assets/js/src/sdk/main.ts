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
export type * from '@Pimcore/app/module-system/module-system'
export type * from '@Pimcore/app/plugin-system/plugin-system'
export * from '@Pimcore/app/config/services'

// Components
export * from '@Pimcore/components/background/background'
export * from '@Pimcore/components/dropdown-menu/dropdown-menu'
export * from '@Pimcore/components/pimcore-image/pimcore-image'

// Modules
export * from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
export * from '@Pimcore/modules/widget-manager/services/widget-registry'

export * from '@Pimcore/modules/asset/asset-api-slice.gen'
export * from '@Pimcore/modules/asset/editor/folder/tab-manager/folder-tab-manager'
export * from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'

export const Pimcore = window.Pimcore
