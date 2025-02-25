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

import { type FormItemProps, type Form } from 'antd'
import React, { useMemo } from 'react'
import { useFormGroupOptional } from '../group/provider/use-form-group-optional'
import { isArray } from 'lodash'

export const withGroupName = (Component: typeof Form.Item): typeof Form.Item => {
  const FormItemWithGroupContext = (props: FormItemProps): React.JSX.Element => {
    const context = useFormGroupOptional()
    const { name, ...baseProps } = props
    let formItemName = name

    if (context !== undefined) {
      const { name: parentName } = context

      formItemName = [
        ...(isArray(parentName) ? parentName : [parentName]),
        ...(isArray(name) ? name : [name])
      ]
    }

    return useMemo(() => (
      <Component
        { ...baseProps }
        name={ formItemName }
      />
    ), [formItemName])
  }

  const NewFormItem = FormItemWithGroupContext as typeof Form.Item
  NewFormItem.useStatus = Component.useStatus
  return NewFormItem
}
