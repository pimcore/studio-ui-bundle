/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { TypeSelect } from './type-select'
import { useTypeSelect } from './provider/use-type-select'

export const ProvidedTypeSelect = (): React.JSX.Element => {
  const context = useTypeSelect()
  const { setValue, ...restProps } = context

  const onChange = (newValue: string | null): void => {
    setValue(newValue)
  }

  return (
    <TypeSelect
      { ...restProps }
      onChange={ onChange }
    />
  )
}
