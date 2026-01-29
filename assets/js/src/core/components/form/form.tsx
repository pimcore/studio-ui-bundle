/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useCallback, useEffect, useMemo } from 'react'
import { Form as AntForm, type FormProps as AntFormProps, type FormItemProps } from 'antd'
import { Space } from '../space/space'
import { withGroupName } from './item/with-group-name'
import { Group } from './group/group'
import { KeyedList } from './controls/keyed-list/keyed-list'
import { withItemProvider } from './item/with-item-provider'
import { withKeyedItemContext } from './item/with-keyed-item-context'
import { withLocalizedFieldsLocale } from '@Pimcore/components/form/localisation/localized-fields/form-item/with-localized-fields-locale'
import { compose } from '@reduxjs/toolkit'
import { NumberedList } from './controls/numbered-list/numbered-list'
import { withNumberedItemContext } from './item/with-numbered-item-context'
import { useStyles } from './form.styles'
import { Conditional } from './conditional/conditional'
import { FormInstanceProvider, type formInstanceType, useForm, useFormInstance } from '@Pimcore/components/form/use-form'

export interface FormProps extends Omit<AntFormProps, 'children' | 'defaultValue' | 'form'> {
  children?: React.ReactNode
  form?: formInstanceType
}

interface FormComponent {
  (props: FormProps): React.JSX.Element
  Item: typeof AntForm.Item
  List: typeof AntForm.List
  Provider: typeof AntForm.Provider
  Group: typeof Group
  KeyedList: typeof KeyedList
  NumberedList: typeof NumberedList
  Conditional: typeof Conditional
  useForm: typeof useForm
  useFormInstance: typeof useFormInstance
  useWatch: typeof AntForm.useWatch
  ErrorList: typeof AntForm.ErrorList
}

const Form = (({ ...props }: FormProps) => {
  const { styles } = useStyles()
  const { form, children, ...restProps } = props
  const [formInstance] = useForm(form)

  const currentFormInstance = form ?? formInstance

  useEffect(() => {
    currentFormInstance.setOnValuesChangeHandler(props.onValuesChange)
  }, [currentFormInstance])

  const requiredMark: FormProps['requiredMark'] = useCallback((label, { required }): ReactNode => {
    return (
      <Space size='mini'>
        {label}
        {required === true && '*'}
      </Space>
    )
  }, [])

  const className = useMemo(() => `${props.className ?? ''} ${styles.container}`, [props.className, styles.container])

  return (
    <AntForm
      requiredMark={ requiredMark }
      { ...restProps }
      className={ className }
      form={ currentFormInstance }
    >
      <FormInstanceProvider formInstance={ currentFormInstance }>
        { children }
      </FormInstanceProvider>
    </AntForm>
  )
}) as FormComponent

const newFormItem = compose(
  withGroupName,
  withLocalizedFieldsLocale,
  withKeyedItemContext,
  withNumberedItemContext,
  withItemProvider
)(AntForm.Item)

Form.Item = newFormItem
Form.List = AntForm.List
Form.Provider = AntForm.Provider
Form.Group = Group
Form.KeyedList = KeyedList
Form.NumberedList = NumberedList
Form.Conditional = Conditional
Form.useForm = useForm
Form.useFormInstance = useFormInstance
Form.useWatch = AntForm.useWatch
Form.ErrorList = AntForm.ErrorList

// Export useForm and useFormInstance separately for direct import to avoid type casting
export { Form, type FormItemProps, type formInstanceType, useForm, useFormInstance }
