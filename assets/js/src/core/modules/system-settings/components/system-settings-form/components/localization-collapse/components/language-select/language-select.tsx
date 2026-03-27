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
import { Select, type SelectProps } from '@Pimcore/components/select/select'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useSystemSettingsContext } from '@Pimcore/modules/system-settings/context/hooks/use-system-settings-context'
import { isNil } from 'lodash'
import React, { useEffect, useState } from 'react'

interface LanguageSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'showSearch'> {
  value?: string
  onChange?: (value: string) => void
}

interface SelectOption {
  label: string
  value: string
}

export const LanguageSelect = (props: LanguageSelectProps): React.JSX.Element => {
  const [options, setOptions] = useState<SelectOption[]>([])
  const { form } = useSystemSettingsContext()
  const settings = useSettings()
  const validLocales: SelectOption = settings.validLocales ?? {}
  const alreadySelectedLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true }) ?? []

  useEffect(() => {
    const selectedLanguages = alreadySelectedLanguages as string[]
    const newOptions: SelectOption[] = Object.entries(validLocales)
      .filter(([key]) => !selectedLanguages.includes(key.replaceAll('-', '_')))
      .map(([key, value]) => ({
        label: value as string,
        value: key
      }))

    setOptions(newOptions)
  }, [form, validLocales, alreadySelectedLanguages])

  return (
    <Select
      allowClear
      filterOption={ (input, option) => {
        if (isNil(option) || isNil(option.label)) return false

        return String(option.label).toLowerCase().includes(input.toLowerCase())
      } }
      options={ options }
      showSearch
      { ...props }
    />
  )
}
