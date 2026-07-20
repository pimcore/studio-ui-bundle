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

/**
 * The in-app toast. Always present, since every notification type can pop up.
 */
@injectable()
export class DynamicTypeNotificationChannelPopup extends DynamicTypeAbstractNotificationChannel {
  readonly id = POPUP_CHANNEL_ID
  readonly icon = 'monitor'
}

/**
 * Registered here rather than by whichever bundle contributes an email channel: the icon is a
 * frontend asset, and email is common enough that every such bundle would otherwise repeat it.
 * The column only appears when a backend channel with this id is actually enabled.
 */
@injectable()
export class DynamicTypeNotificationChannelEmail extends DynamicTypeAbstractNotificationChannel {
  readonly id = 'email'
  readonly icon = 'email'
}
