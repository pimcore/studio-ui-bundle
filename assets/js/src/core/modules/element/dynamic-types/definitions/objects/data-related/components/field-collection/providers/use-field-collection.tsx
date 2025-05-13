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
import { FieldCollectionContext, type IFieldCollectionContext } from './field-collection-provider'

export type UseFieldCollectionReturn = IFieldCollectionContext

export const useFieldCollection = (): UseFieldCollectionReturn => {
  const context = useContext(FieldCollectionContext)

  return context
}
