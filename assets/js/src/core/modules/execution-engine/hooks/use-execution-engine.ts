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
import { type ExecutionEngine } from '../services/execution-engine'

/**
 * React hook to access the ExecutionEngine service
 * Uses dependency injection to get the service instance
 */
export const useExecutionEngine = (): ExecutionEngine => {
  return container.get<ExecutionEngine>(serviceIds.executionEngine)
}
