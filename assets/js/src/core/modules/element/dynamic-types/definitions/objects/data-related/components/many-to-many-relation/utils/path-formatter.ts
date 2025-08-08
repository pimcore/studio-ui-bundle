/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNonEmptyString } from '@Pimcore/utils/type-utils'

/**
 * Checks if a pathFormatterConfig object is valid (has both non-empty class and name)
 */
export const isValidPathFormatterConfig = (config: { name?: string | undefined, class?: string | undefined } | undefined): config is { name: string, class: string } => {
  return config !== undefined && isNonEmptyString(config.class) && isNonEmptyString(config.name)
}
