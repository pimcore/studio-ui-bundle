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

export interface KeyLabelKey {
  name: string
  title?: string | null
}

/** Label of a classification store key: the title the layout carries for it, or its name when none is set. */
export const getKeyLabel = (key: KeyLabelKey): string => {
  return isNonEmptyString(key.title) ? key.title : key.name
}
