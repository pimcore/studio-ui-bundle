/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNonEmptyString } from '@sdk/utils'

// Derives the options-source mode, inferring it from optionsProviderClass
// when optionsProviderType is not explicitly set.
export const inferOptionsProviderType = (fieldDef: Record<string, unknown>): string => {
  if (isNonEmptyString(fieldDef.optionsProviderType)) {
    return fieldDef.optionsProviderType
  }

  return isNonEmptyString(fieldDef.optionsProviderClass) ? 'class' : 'configure'
}
