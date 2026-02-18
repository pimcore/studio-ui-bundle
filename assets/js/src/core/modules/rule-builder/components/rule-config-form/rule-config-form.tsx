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
import { Form, FormKit } from '@sdk/components'
import { useDebouncedFormChange, type UseDebouncedFormChangeOptions } from '@Pimcore/components/form/hooks/use-debounced-form-change'

interface RuleConfigFormProps<T extends Record<string, any>> {
  config: T
  onChange: (config: T) => void
  disabled?: boolean
  children: ReactNode
  /**
   * Debounce options for forms with text inputs or continuously-changing fields.
   * - delay: Debounce delay in ms (default: 300)
   * - immediateFields: Fields that bypass debouncing
   * - tag: Tag for flush coordination (auto-resolved from provider if omitted)
   */
  debounceOptions?: UseDebouncedFormChangeOptions
}

/**
 * Reusable form wrapper for rule configurations (conditions, actions, triggers).
 */
export function RuleConfigForm<T extends Record<string, any>> ({
  config,
  onChange,
  disabled,
  children,
  debounceOptions
}: RuleConfigFormProps<T>): React.JSX.Element {
  const [form] = Form.useForm<T>()

  const handleValuesChange = useCallback((_changedValues: Partial<T>, allValues: T): void => {
    onChange(allValues)
  }, [onChange])

  const { handleFormChange } = useDebouncedFormChange(handleValuesChange, {
    ...debounceOptions,
    disabled: debounceOptions === undefined
  })

  const formProps = useMemo(() => ({
    form,
    component: false as const,
    disabled,
    initialValues: config,
    onValuesChange: handleFormChange
  }), [form, disabled, config, handleFormChange])

  return (
    <FormKit formProps={ formProps }>
      {children}
    </FormKit>
  )
}
