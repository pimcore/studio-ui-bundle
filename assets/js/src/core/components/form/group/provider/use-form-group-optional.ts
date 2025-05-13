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
import { FormGroupContext, type FormGroupContextProps } from './form-group-provider'

export type useFormGroupOptionalReturn = FormGroupContextProps

export const useFormGroupOptional = (): useFormGroupOptionalReturn => {
  const context = useContext(FormGroupContext)

  return context
}
