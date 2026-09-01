/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { DynamicTypeAbstractNotificationChannel } from './dynamic-type-abstract-notification-channel'

/** Channel id the backend reserves for the in-app toast preference. */
export const POPUP_CHANNEL_ID = 'popup'

@injectable()
export class DynamicTypeNotificationChannelPopup extends DynamicTypeAbstractNotificationChannel {
  readonly id = POPUP_CHANNEL_ID
  readonly icon = 'monitor'
}

// Registered here rather than per bundle: the icon is a frontend asset and email is common
// enough that every contributing bundle would otherwise repeat it.
@injectable()
export class DynamicTypeNotificationChannelEmail extends DynamicTypeAbstractNotificationChannel {
  readonly id = 'email'
  readonly icon = 'email'
}
