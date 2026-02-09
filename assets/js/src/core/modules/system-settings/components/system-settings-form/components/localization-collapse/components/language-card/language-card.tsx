import { Form } from "@Pimcore/components/form/form"
import { useSystemSettingsContext } from "@Pimcore/modules/system-settings/context/hooks/use-system-settings-context"
import { getLanguageName } from "@Pimcore/utils/language"
import { Card, Checkbox, Select, Switch } from "@sdk/components"
import React, { useMemo } from "react"
import { useTranslation } from "react-i18next"

interface LanguageCardProps {
  locale: string
}

export const LanguageCard = ({ locale }: LanguageCardProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useSystemSettingsContext()
  const validLanguages = Form.useWatch(['general', 'valid_languages'], { form, preserve: true }) ?? []

  const fallbackOptions = useMemo(() => {
    return validLanguages
      .filter((lang: string) => lang !== locale)
      .map((lang: string) => ({
        label: `${getLanguageName({ locale: lang })} (${lang})`,
        value: lang
      }))
  }, [validLanguages, locale])

  const handleMandatoryChange = (checked: boolean): void => {
    const currentRequired = form.getFieldValue(['general', 'required_languages']) ?? []

    if (checked && !currentRequired.includes(locale)) {
      form.setFieldsValue({
        general: {
          required_languages: [...currentRequired, locale]
        }
      })
    } else if (!checked && currentRequired.includes(locale)) {
      form.setFieldsValue({
        general: {
          required_languages: currentRequired.filter((lang: string) => lang !== locale)
        }
      })
    }
  }

  return (
    <Card
      title={getLanguageName({ locale }) + ` (${locale})`}
    >
      <Form.Item
        label={t('system-settings.form.localization.field.fallback-language')}
        name={['general', 'fallback_languages', locale]}
      >
        <Select
          allowClear
          options={fallbackOptions}
          mode="multiple"
          placeholder={t('system-settings.form.localization.field.fallback-language-placeholder')}
        />
      </Form.Item>

      <Form.Item
        name={['general', 'default_language']}
        valuePropName="checked"
        getValueFromEvent={(checked) => checked ? locale : ''}
        getValueProps={(value) => ({ checked: value === locale })}
      >
        <Switch
          labelRight={t('system-settings.form.localization.field.default-language')}
        />
      </Form.Item>

      <Form.Item
        shouldUpdate={(prevValues, curValues) =>
          prevValues.general?.required_languages !== curValues.general?.required_languages
        }
      >
        {() => {
          const currentRequired = form.getFieldValue(['general', 'required_languages']) ?? []
          return (
            <Switch
              labelRight={t('system-settings.form.localization.field.mandatory')}
              checked={currentRequired.includes(locale)}
              onChange={(checked) => { handleMandatoryChange(checked) }}
            />
          )
        }}
      </Form.Item>
    </Card>
  )
}
