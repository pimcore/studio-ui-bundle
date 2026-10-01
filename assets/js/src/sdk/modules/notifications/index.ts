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

export * from '@Pimcore/modules/notifications/notification-list'

export * as NotificationApiSlice from '@Pimcore/modules/notifications/notifications-slice-enhanced'

// Extension seams for bundles contributing notification types or delivery channels; register a
// definition in your module's onInit.
export * from '@Pimcore/modules/notifications/dynamic-types/definitions/dynamic-type-abstract-notification'
export * from '@Pimcore/modules/notifications/dynamic-types/definitions/dynamic-type-abstract-notification-channel'
export * from '@Pimcore/modules/notifications/dynamic-types/registry/dynamic-type-notification-registry'
export * from '@Pimcore/modules/notifications/dynamic-types/registry/dynamic-type-notification-channel-registry'
export * from '@Pimcore/modules/notifications/utils/notification-payload'
