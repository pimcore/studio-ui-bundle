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

import React, { Children, isValidElement, useEffect, useMemo } from 'react'
import { useNumberedList } from '../provider/numbered-list/use-numbered-list'
import { useItem } from '../../item/provider/item/use-item'
import { type FormItemProps } from 'antd'

export interface NumberedFormItemControlProps {
  children: React.ReactNode
  getValueFromEvent?: FormItemProps['getValueFromEvent']
  onChange?: (value: any) => void
  value?: any
  id?: string
}

export const NumberedFormItemControl = ({ children, onChange: baseOnChange, value: baseValue, ...props }: NumberedFormItemControlProps): React.JSX.Element => {
  const { operations, getAdditionalComponentProps } = useNumberedList()
  const { name } = useItem()
  const Child = Children.only(children)
  const value = operations.getValue(name)

  useEffect(() => {
    operations.update(name, value ?? null, true)
  }, [])

  const onChange: NumberedFormItemControlProps['onChange'] = (value: any) => {
    if (value?.target !== undefined && typeof value.target === 'object') {
      operations.update(name, value.target.value, false)
      return
    }

    operations.update(name, value, false)
  }

  if (!isValidElement(Child)) {
    throw new Error('NumberedFormItemControl only accepts a single child')
  }

  const Component = Child.type

  return useMemo(() => (
    <Component
      { ...Child.props }
      { ...props }
      { ...getAdditionalComponentProps?.(name) }
      onChange={ onChange }
      value={ value }
    />
  ), [Child.props, props, value])
}
