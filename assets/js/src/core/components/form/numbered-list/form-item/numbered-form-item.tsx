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

import { type Form, type FormItemProps } from 'antd'
import React, { useMemo } from 'react'
import { NumberedFormItemControl } from './numbered-form-item-control'

export interface NumberedFormItemProps {
  Component: typeof Form.Item
  componentProps: FormItemProps
}

export const NumberedFormItem = ({ Component, componentProps }: NumberedFormItemProps): React.JSX.Element => {
  const { children, ...baseProps } = componentProps
  const currentChildren = children as unknown as React.ReactNode

  return useMemo(() => (
    <Component { ...baseProps } >
      <NumberedFormItemControl>
        { currentChildren }
      </NumberedFormItemControl>
    </Component>
  ), [])
}
