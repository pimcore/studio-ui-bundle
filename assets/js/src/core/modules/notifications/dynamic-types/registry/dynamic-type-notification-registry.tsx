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
import { type DynamicTypeAbstractNotification } from '../definitions/dynamic-type-abstract-notification'

/** Renderers keyed by notification type; unregistered types fall back to the plain rendering. */
@injectable()
export class DynamicTypeNotificationRegistry extends DynamicTypeRegistryAbstract<DynamicTypeAbstractNotification> {}
