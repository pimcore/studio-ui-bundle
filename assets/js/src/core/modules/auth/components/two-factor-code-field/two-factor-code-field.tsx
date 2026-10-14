/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { type GetRef, Input } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useStyles } from './two-factor-code-field.styles'

export interface TwoFactorCodeFormValues {
  code: string
}

const CodeBoxes = Input.OTP

export type TwoFactorCodeAlign = 'stretch' | 'center'

interface TwoFactorCodeInputProps {
  align: TwoFactorCodeAlign
  digits: number
  onChange?: (value: string) => void
}

const TwoFactorCodeInput = ({ align, digits, onChange }: TwoFactorCodeInputProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const form = Form.useFormInstance<TwoFactorCodeFormValues>()
  const boxes = useRef<GetRef<typeof CodeBoxes>>(null)

  // The form remounts this field on reset; take back the focus the old boxes dropped, but never steal it
  useEffect(() => {
    if (document.activeElement === document.body) {
      boxes.current?.focus()
    }
  }, [])

  // Input.OTP reports a value only once every box is filled, so keep the form in step on each keystroke
  const handleInput = (cells: string[]): void => {
    onChange?.(cells.join(''))

    if (form.getFieldError('code').length > 0) {
      form.setFields([{ name: 'code', errors: [] }])
    }
  }

  return (
    <div className={ align === 'center' ? styles.codeBoxesCentered : styles.codeBoxes }>
      <CodeBoxes
        aria-label={ t('two-factor-form.code.placeholder') }
        inputMode="numeric"
        length={ digits }
        onChange={ () => { form.submit() } }
        onInput={ handleInput }
        ref={ boxes }
        role="group"
      />
    </div>
  )
}

export interface TwoFactorCodeFieldProps {
  digits: number
  align?: TwoFactorCodeAlign
}

export const TwoFactorCodeField = ({ digits, align = 'stretch' }: TwoFactorCodeFieldProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form.Item
      name="code"
      rules={ [
        { required: true, message: t('two-factor-form.code.required') },
        { pattern: new RegExp(`^\\d{${digits}}$`), message: t('two-factor-form.code.invalid-format', { digits }) }
      ] }
      validateTrigger={ false }
    >
      <TwoFactorCodeInput
        align={ align }
        digits={ digits }
      />
    </Form.Item>
  )
}
