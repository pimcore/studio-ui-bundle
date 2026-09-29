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
import { Icon } from '@Pimcore/components/icon/icon'
import { Input } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface TwoFactorCodeFormValues {
  code: string
}

export const TwoFactorCodeField = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form.Item
      name="code"
      rules={ [
        { required: true, message: t('two-factor-form.code.required') },
        { pattern: /^\d{6}$/, message: t('two-factor-form.code.invalid-format') }
      ] }
    >
      <Input
        aria-label={ t('two-factor-form.code.placeholder') }
        autoComplete="one-time-code"
        inputMode="numeric"
        maxLength={ 6 }
        name="code"
        placeholder={ t('two-factor-form.code.placeholder') }
        prefix={ <Icon value="lock" /> }
      />
    </Form.Item>
  )
}
