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
import { FieldWidthContext, type IFieldWidthContext } from './field-width-provider'

export const useFieldWidth = (): IFieldWidthContext => {
  const context = useContext(FieldWidthContext)
  if (context === undefined) {
    throw new Error('useFieldWidth must be used within a FieldWidthProvider')
  }
  return context
}
