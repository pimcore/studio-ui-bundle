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
import { useNumberedList } from '../provider/numbered-list/use-numbered-list'
import { useItem } from '../../../item/provider/item/use-item'
import { type FormItemProps } from 'antd'
import { isEqual, isUndefined } from 'lodash'
import { usePrevious } from '@Pimcore/utils/hooks/use-previous'

export interface NumberedFormItemControlProps {
  children: React.ReactNode
  getValueFromEvent?: FormItemProps['getValueFromEvent']
  onChange?: (value: any) => void
  value?: any
  id?: string
}

export const NumberedFormItemControl = ({ children, onChange: baseOnChange, value: baseValue, ...props }: NumberedFormItemControlProps): React.JSX.Element => {
  const { getValueFromEvent } = props

  const { operations, getAdditionalComponentProps } = useNumberedList()
  const { name, initialValue } = useItem()

  const Child = useMemo(() => Children.only(children), [children])
  const value = operations.getValue(name)
  const previousValue = usePrevious(value)

  const cachedValue = useMemo(() => {
    if (!isEqual(value, previousValue)) {
      return value
    }

    return previousValue
  }, [value])

  useEffect(() => {
    if (value === undefined) {
      operations.update(name, initialValue ?? null, true)
    }
  }, [value])

  const onChange: NumberedFormItemControlProps['onChange'] = useCallback((value: any) => {
    const changedValue = !isUndefined(getValueFromEvent)
      ? getValueFromEvent(value)
      : value?.target?.value ?? value

    operations.update(name, changedValue, false)
  }, [])

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
      value={ cachedValue }
    />
  ), [Child, props, cachedValue])
}
