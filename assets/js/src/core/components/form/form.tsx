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

import React, { type ReactNode } from 'react'
import { Form as AntForm, type FormProps as AntFormProps } from 'antd'
import { Space } from '../space/space'

export interface FormProps extends Omit<AntFormProps, 'children'> {
  children?: React.ReactNode
}

const Form = (({ ...props }: FormProps) => {
  const requiredMark: FormProps['requiredMark'] = (label, { required }): ReactNode => {
    return (
      <Space size='mini'>
        {label}
        {required && '*'}
      </Space>
    )
  }

  return (
    <AntForm
      requiredMark={ requiredMark }
      { ...props }
    />
  )
}) as typeof AntForm

Form.Item = AntForm.Item
Form.List = AntForm.List
Form.Provider = AntForm.Provider
Form.useForm = AntForm.useForm
Form.useFormInstance = AntForm.useFormInstance
Form.useWatch = AntForm.useWatch
Form.ErrorList = AntForm.ErrorList

export { Form }
