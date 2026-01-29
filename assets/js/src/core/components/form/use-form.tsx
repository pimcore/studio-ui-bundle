/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, type FormInstance } from 'antd'
import { type NamePath } from 'antd/es/form/interface'
import { type FormProps } from 'antd/lib'
import { set } from 'lodash'
import React, { createContext, useMemo } from 'react'

type SetFieldValueParameters = Parameters<FormInstance['setFieldValue']>
type SetFieldsValueParameters = Parameters<FormInstance['setFieldsValue']>

export interface CustomSetFieldValueOptions {
  triggerChange?: boolean
}

export type formInstanceType<Values = any> = Omit<FormInstance<Values>, 'setFieldValue' | 'setFieldsValue'> & {
  setOnValuesChangeHandler: (handler: FormProps['onValuesChange']) => void
  _onValuesChangeHandler?: FormProps['onValuesChange']
  setFieldValue: (name: NamePath, value: SetFieldValueParameters[1], options?: CustomSetFieldValueOptions) => void
  setFieldsValue: (values: SetFieldsValueParameters[0], options?: CustomSetFieldValueOptions) => void
}

export const useForm = <Values = any>(form?: FormInstance<Values>): [formInstanceType<Values>] => {
  const [formInstance] = Form.useForm(form) as [formInstanceType<Values>]
  const originalSetFieldValue = formInstance.setFieldValue
  const originalSetFieldsValue = formInstance.setFieldsValue

  const setOnValuesChangeHandler = (handler: FormProps['onValuesChange']): void => {
    formInstance._onValuesChangeHandler = handler
  }

  const setFieldValue = (name: NamePath, value: SetFieldValueParameters['1'], options?: CustomSetFieldValueOptions): void => {
    const { triggerChange = false } = options ?? {}

    originalSetFieldValue(name, value)

    if (triggerChange && formInstance._onValuesChangeHandler !== undefined) {
      const update = {}
      set(update, name as string, value)
      formInstance._onValuesChangeHandler(update, formInstance.getFieldsValue())
    }
  }

  const setFieldsValue = (values: SetFieldsValueParameters[0], options?: CustomSetFieldValueOptions): void => {
    const { triggerChange = false } = options ?? {}

    originalSetFieldsValue(values)

    if (triggerChange && formInstance._onValuesChangeHandler !== undefined) {
      formInstance._onValuesChangeHandler(values, formInstance.getFieldsValue())
    }
  }

  const newFormInstance: formInstanceType<Values> = {
    ...formInstance,
    setOnValuesChangeHandler,
    setFieldValue,
    setFieldsValue
  }

  return [newFormInstance]
}

export const FormInstanceContext = createContext<formInstanceType | null>(null);

export interface FormInstanceProviderProps {
  formInstance: formInstanceType
  children: React.ReactNode
}

export const FormInstanceProvider: React.FC<FormInstanceProviderProps> = ({ formInstance, children }) => {
  return useMemo(() => (
    <FormInstanceContext.Provider value={formInstance}>
      {children}
    </FormInstanceContext.Provider>
  ), [formInstance, children])
}

export const useFormInstance = <Values = any>(): formInstanceType<Values> => {
  return React.useContext(FormInstanceContext) as formInstanceType<Values>
}
