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
import { type Form, type FormItemProps } from 'antd'
import { NumberedFormItemControl } from './numbered-form-item-control'
import { VirtualItem } from '../../item/virtual-item'

export interface NumberedFormItemProps {
  Component: typeof Form.Item
  componentProps: FormItemProps
}

const NumberedFormItem = ({ Component, componentProps }: NumberedFormItemProps): React.JSX.Element => {
  const { children, ...baseProps } = componentProps
  const currentChildren = children as unknown as React.ReactNode

  return (
    <VirtualItem { ...baseProps }>
      <NumberedFormItemControl getValueFromEvent={ baseProps.getValueFromEvent }>
        { currentChildren }
      </NumberedFormItemControl>
    </VirtualItem>
  )
}

const memoedNumberedFormItem = React.memo(NumberedFormItem)

export { memoedNumberedFormItem as NumberedFormItem }
