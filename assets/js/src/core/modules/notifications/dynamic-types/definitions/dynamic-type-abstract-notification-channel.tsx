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
 * Presentation for a delivery channel column in the notification preferences. Optional — an
 * unregistered channel still renders a column, with a generic icon and the API's label.
 */
@injectable()
export abstract class DynamicTypeAbstractNotificationChannel extends DynamicTypeAbstract {
  /** Matches the channel id reported by the API, e.g. `email`. */
  abstract readonly id: string

  /** Icon name from the icon library, shown in the column header. */
  abstract readonly icon: string

  /** Overrides the API's translation key. */
  readonly translationKey?: string
}
