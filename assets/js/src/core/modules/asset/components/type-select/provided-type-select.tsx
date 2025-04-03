/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
