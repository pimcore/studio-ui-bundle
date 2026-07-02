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

export * from '@Pimcore/modules/app/component-registry/component-registry'
export { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'
export { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
export * from '@Pimcore/modules/app/context-menu-registry'
export * from '@Pimcore/modules/app/context-menu-registry/context-types'

export * from '@Pimcore/modules/app/error-boundary/error-boundary'
export { default as trackError, ApiError, GeneralError, isApiErrorData } from '@Pimcore/modules/app/error-handler'
export * from '@Pimcore/modules/app/error-handler/types'

export * from '@Pimcore/modules/app/theme/theme-provider'
export * from '@Pimcore/modules/app/theme/utils/themes/theme-tokens'
export * from '@Pimcore/modules/app/theme/dynamic-types/definitions/dynamic-type-theme-abstract'
export * from '@Pimcore/modules/app/theme/dynamic-types/registry/dynamic-type-theme-registry'
export * from '@Pimcore/modules/app/theme/constants/theme-ids'
export * from '@Pimcore/modules/app/theme/constants/theme-algorithms'
export * from '@Pimcore/modules/app/theme/theme-slice'

export * from '@Pimcore/modules/app/hook/use-handle-keybindings'
export * from '@Pimcore/modules/app/hook/use-date-converter'

export * from '@Pimcore/modules/app/modal-holder/use-modal-holder'

export * from '@Pimcore/modules/app/settings/hooks/use-settings'
// Intentionally narrowed: only read selectors of the settings slice are part
// of the public SDK surface — write actions (setSettings, setAdminSettings, ...)
// stay internal to the core.
export { getAdminSettings } from '@Pimcore/modules/app/settings/settings-slice'

export * from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
export * from '@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav'
export * from '@Pimcore/modules/app/base-layout/right-sidebar/logo/subscription-details'

export * from '@Pimcore/modules/app/app-loader/services/app-loader-registry'
export type { LoadPhase } from '@Pimcore/modules/app/app-loader/app-loader'
export { Background } from '@Pimcore/components/background/background'
export type { BackgroundProps } from '@Pimcore/components/background/background'

export * from '@Pimcore/modules/app/utils/auto-hide-empty-content/auto-hide-empty-content'
export * from '@Pimcore/modules/app/utils/download'
