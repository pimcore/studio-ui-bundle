/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Commercial License (PCL)
* - Pimcore Enterprise License (PEL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PEL
*/

import React, { type ReactNode } from 'react'
import { Form, FormKit } from '@sdk/components'

interface RuleConfigFormProps<T extends Record<string, any>> {
  config: T
  onChange: (config: T) => void
  disabled?: boolean
  children: ReactNode
}

/**
 * Reusable form wrapper for rule configurations (conditions, actions, triggers).
 * Eliminates boilerplate for form setup, change tracking, and value synchronization.
 *
 * @example
 * ```tsx
 * <RuleConfigForm config={config} onChange={onChange} disabled={disabled}>
 *   <Form.Item label={t('label')} name="field">
 *     <Input />
 *   </Form.Item>
 * </RuleConfigForm>
 * ```
 */
export function RuleConfigForm<T extends Record<string, any>> ({
  config,
  onChange,
  disabled,
  children
}: RuleConfigFormProps<T>): React.JSX.Element {
  const [form] = Form.useForm<T>()

  const handleValuesChange = (_changedValues: Partial<T>, allValues: T): void => {
    onChange(allValues)
  }

  return (
    <FormKit
      formProps={{
        form,
        component: false,
        initialValues: config,
        onValuesChange: handleValuesChange,
        disabled
      }}
    >
      {children}
    </FormKit>
  )
}
