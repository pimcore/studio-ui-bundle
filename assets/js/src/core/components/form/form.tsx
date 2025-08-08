/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useCallback, useMemo } from 'react'
import { Form as AntForm, type FormProps as AntFormProps, type FormItemProps } from 'antd'
import { Space } from '../space/space'
import { withGroupName } from './item/with-group-name'
import { Group } from './group/group'
import { KeyedList } from './controls/keyed-list/keyed-list'
import { withItemProvider } from './item/with-item-provider'
import { withKeyedItemContext } from './item/with-keyed-item-context'
import { withLocalizedFieldsLocale } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/localized-fields/form-item/with-localized-fields-locale'
import { compose } from '@reduxjs/toolkit'
import { NumberedList } from './controls/numbered-list/numbered-list'
import { withNumberedItemContext } from './item/with-numbered-item-context'
import { useStyles } from './form.styles'
import { Panel } from '@Pimcore/components/panel/panel'

export interface FormProps extends Omit<AntFormProps, 'children'> {
  children?: React.ReactNode
}

const Form = (({ ...props }: FormProps) => {
  const { styles } = useStyles()

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
      { ...props }
      className={ className }
    />
  )
}) as typeof AntForm & {
  Group: typeof Group
  KeyedList: typeof KeyedList
  NumberedList: typeof NumberedList
  Panel: typeof Panel
}

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
Form.Panel = Panel
Form.useForm = AntForm.useForm
Form.useFormInstance = AntForm.useFormInstance
Form.useWatch = AntForm.useWatch
Form.ErrorList = AntForm.ErrorList

export { Form, type FormItemProps }
