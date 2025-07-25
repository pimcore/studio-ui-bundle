/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { Children, isValidElement, useCallback, useEffect, useMemo } from 'react'
import { useKeyedList } from '../provider/keyed-list/use-keyed-list'
import { useItem } from '../../item/provider/item/use-item'
import { type FormItemProps } from 'antd'
import { isUndefined } from 'lodash'

export interface KeyedFormItemControlProps {
  children: React.ReactNode
  getValueFromEvent?: FormItemProps['getValueFromEvent']
  onChange?: (value: any) => void
  value?: any
  id?: string
}

export const KeyedFormItemControl = ({ children, onChange: baseOnChange, value: baseValue, ...props }: KeyedFormItemControlProps): React.JSX.Element => {
  const { getValueFromEvent } = props

  const { operations, getAdditionalComponentProps } = useKeyedList()
  const { name, initialValue } = useItem()

  const Child = Children.only(children)
  const value = operations.getValue(name)

  useEffect(() => {
    operations.update(name, value ?? initialValue ?? null, true)
  }, [])

  const onChange: KeyedFormItemControlProps['onChange'] = useCallback((value: any) => {
    const changedValue = !isUndefined(getValueFromEvent)
      ? getValueFromEvent(value)
      : value?.target?.value ?? value

    operations.update(name, changedValue, false)
  }, [getValueFromEvent, name, operations])

  if (!isValidElement(Child)) {
    throw new Error('KeyedFormItemControl only accepts a single child')
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
