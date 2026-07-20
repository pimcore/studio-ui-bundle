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
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'

/**
 * Presentation for a delivery channel column in the notification preferences.
 *
 * The API can only tell the frontend a channel's id and translation key; it has no business
 * naming an icon from the frontend's icon library. A bundle contributing a channel therefore
 * registers this alongside its backend ChannelInterface.
 *
 * Registering is optional: an unknown channel still renders a usable column using a generic
 * icon and the label the API supplied.
 */
@injectable()
export abstract class DynamicTypeAbstractNotificationChannel extends DynamicTypeAbstract {
  /** Matches the channel id reported by the API, e.g. `email`. */
  abstract readonly id: string

  /** Icon name from the icon library, shown in the column header. */
  abstract readonly icon: string

  /**
   * Overrides the API's translation key. Rarely needed — prefer shipping the key with the
   * channel so both halves stay in one place.
   */
  readonly translationKey?: string
}
