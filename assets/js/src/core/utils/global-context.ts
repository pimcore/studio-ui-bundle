/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isEmptyValue } from '@Pimcore/utils/type-utils'

const OBJECT_CONTEXT_PREFIX = 'object'

export const getDataObjectContext = (objectData: any): string[] => {
  const context = [OBJECT_CONTEXT_PREFIX]

  if (!isEmptyValue(objectData?.className)) {
    context.push(`${OBJECT_CONTEXT_PREFIX}_${objectData?.className.toLowerCase()}`)
  } else if (objectData?.type === 'folder') {
    context.push(`${OBJECT_CONTEXT_PREFIX}_folder`)
  }

  return context
}
