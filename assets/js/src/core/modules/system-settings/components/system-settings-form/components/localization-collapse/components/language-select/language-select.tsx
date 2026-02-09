import { Form } from "@Pimcore/components/form/form"
import { Select, SelectProps } from "@Pimcore/components/select/select"
import { useSettings } from "@Pimcore/modules/app/settings/hooks/use-settings"
import { useSystemSettingsContext } from "@Pimcore/modules/system-settings/context/hooks/use-system-settings-context"
import React, { useEffect, useState } from "react"

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
  const validLocales = settings['validLocales'] ?? {}
  const alreadySelectedLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true }) ?? []

  useEffect(() => {
    const newOptions: SelectOption[] = Object.entries(validLocales).map(([key, value]) => {
      if (!alreadySelectedLanguages.includes(key)) {
        return {
          label: value,
          value: key
        }
      }
    }).filter((option): option is SelectOption => option !== undefined)

    setOptions(newOptions)
  }, [form, validLocales, alreadySelectedLanguages])

  return (
    <Select
      allowClear
      showSearch
      filterOption={(input, option) => {
        if (!option || !option.label) return false

        return String(option.label).toLowerCase().includes(input.toLowerCase())
      }}
      options={options}
      {...props}
    />
  )
}
