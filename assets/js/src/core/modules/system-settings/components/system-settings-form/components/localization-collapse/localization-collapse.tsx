import { CollapseItem } from "@Pimcore/components/collapse/collapse"
import { useSystemSettingsContext } from "@Pimcore/modules/system-settings/context/hooks/use-system-settings-context"
import { Flex, IconButton } from "@sdk/components"
import { isNil } from "lodash"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { LanguageForm } from "./components/language-form/language-form"
import { LanguageSelect } from "./components/language-select/language-select"

export const LocalizationCollapse = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useSystemSettingsContext()
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>()

  const handleAddLanguage = (): void => {
    if (isNil(selectedLanguage)) {
      return
    }

    const currentLanguages = form.getFieldValue(['general', 'valid_languages']) ?? []

    console.log('currentLanguages', currentLanguages)

    if (!currentLanguages.includes(selectedLanguage)) {
      const allValues = form.getFieldsValue(true)
      form.setFieldsValue({
        ...allValues,
        general: {
          ...allValues.general,
          valid_languages: [...currentLanguages, selectedLanguage]
        }
      })
      setSelectedLanguage(undefined)
    }
  }

  return (
    <CollapseItem
      label={t('system-settings.collapse.localization')}
      forceRender
    >
      <Flex
        vertical
        gap={'small'}
      >
        <Flex gap={'extra-small'}>
          <LanguageSelect
            placeholder={t('system-settings.form.localization.field.add-language')}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
          />
          <IconButton
            type="primary"
            icon={{
              value: 'plus-circle'
            }}
            onClick={handleAddLanguage}
            disabled={isNil(selectedLanguage)}
          />
        </Flex>

        <LanguageForm />
      </Flex>
    </CollapseItem>
  )
}
