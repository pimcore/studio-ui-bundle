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
import { DynamicTypeRegistryAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'
import { type DynamicTypeAbstractNotificationChannel } from '../definitions/dynamic-type-abstract-notification-channel'

/**
 * Channel presentation keyed by channel id. The column set itself comes from the API, so an
 * unregistered channel still gets a column — this only supplies its icon and optional label.
 */
@injectable()
export class DynamicTypeNotificationChannelRegistry
  extends DynamicTypeRegistryAbstract<DynamicTypeAbstractNotificationChannel> {}
