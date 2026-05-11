/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isObject } from 'lodash'

// The backend may serialize an unresolved column config as `false`, so we
// must verify the value is an object before using the `in` operator on it.
export const hasFieldDefinition = (config: unknown): config is { fieldDefinition: any } => {
  return isObject(config) && 'fieldDefinition' in config
}
