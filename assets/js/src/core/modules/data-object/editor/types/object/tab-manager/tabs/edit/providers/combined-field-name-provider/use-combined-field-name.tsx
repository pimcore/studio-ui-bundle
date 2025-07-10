/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { CombinedFieldNameContext, type ICombinedFieldNameContext } from './combined-field-name-provider'

export const useCombinedFieldName = (): ICombinedFieldNameContext | undefined => {
  const combinedFieldNameContext = useContext(CombinedFieldNameContext)

  if (combinedFieldNameContext === undefined) {
    return undefined
  }

  return combinedFieldNameContext
}