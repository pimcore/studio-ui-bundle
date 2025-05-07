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
import { DataObjectContext } from '../data-object-provider'

export interface UseDataObjectReturn {
  id: number | undefined
}

export const useDataObject = (): UseDataObjectReturn => {
  const { id } = useContext(DataObjectContext)

  return {
    id
  }
}
