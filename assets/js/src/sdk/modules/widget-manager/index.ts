/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

if (module.hot !== undefined) {
  module.hot.accept()
}

export * from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
export * from '@Pimcore/modules/widget-manager/services/widget-registry'
export * from '@Pimcore/modules/widget-manager/widget-manager-slice'
// Additional types
export type { Widget } from '@Pimcore/modules/widget-manager/services/widget-registry'
export type { ElementIcon } from '@Pimcore/components/icon/icon'
export type { ElementType } from '@Pimcore/types/enums/element/element-type'
export * from '@Pimcore/modules/widget-manager/events'

// Processor Registry for widget manipulation
export * from '@Pimcore/modules/widget-manager/services/processors/perspective-processor-registry'

// Components for titleComponent (tab/button titles)
export { TabTitleContainer } from '@Pimcore/modules/widget-manager/title/tab-title-container'
export { BorderTitleView } from '@Pimcore/modules/widget-manager/title/border-title-view'
export { TabTitleView } from '@Pimcore/modules/widget-manager/title/tab-title-view'
export type { TabTitleContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-container'
export type { TabTitleOuterContainerProps } from '@Pimcore/modules/widget-manager/title/tab-title-outer-container'

// Components for contentTitleComponent (widget content headers)
export { WidgetContentTitleView } from '@Pimcore/modules/widget-manager/widget/widget-content-title-view'
export type { WidgetContentTitleViewProps } from '@Pimcore/modules/widget-manager/widget/widget-content-title-view'
export type { WidgetContentTitleContainerProps } from '@Pimcore/modules/widget-manager/widget/widget-content-title-container'
