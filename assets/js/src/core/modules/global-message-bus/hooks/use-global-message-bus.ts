/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type GlobalMessageBus } from '../services/global-message-bus'

/**
 * Hook to access the GlobalMessageBus service
 * Provides easy access to register/unregister message handlers
 */
export const useGlobalMessageBus = (): GlobalMessageBus => {
  return container.get<GlobalMessageBus>(serviceIds.globalMessageBus)
}
