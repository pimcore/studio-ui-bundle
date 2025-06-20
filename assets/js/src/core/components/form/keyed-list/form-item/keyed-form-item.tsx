/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Form, type FormItemProps } from 'antd'
import React, { useMemo } from 'react'
import { KeyedFormItemControl } from './keyed-form-item-control'

export interface KeyedFormItemProps {
  Component: typeof Form.Item
  componentProps: FormItemProps
}

export const KeyedFormItem = ({ Component, componentProps }: KeyedFormItemProps): React.JSX.Element => {
  const { children, ...baseProps } = componentProps
  const currentChildren = children as unknown as React.ReactNode

  return useMemo(() => (
    <Component { ...baseProps } >
      <KeyedFormItemControl getValueFromEvent={ baseProps.getValueFromEvent }>
        { currentChildren }
      </KeyedFormItemControl>
    </Component>
  ), [baseProps.name])
}
