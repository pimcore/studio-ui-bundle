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
import { useSystemSettingsContext } from '@Pimcore/modules/system-settings/context/hooks/use-system-settings-context'
import { getLanguageName } from '@Pimcore/utils/language'
import { Card, IconButton, Select, Switch } from '@sdk/components'
import { isNil } from 'lodash'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

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

  const isOnlyLanguage = validLanguages.length <= 1

  const handleDeleteLanguage = (): void => {
    const currentLanguages: string[] = form.getFieldValue(['general', 'valid_languages']) ?? []
    const updatedLanguages = currentLanguages.filter((lang: string) => lang !== locale)

    const currentRequired: string[] = form.getFieldValue(['general', 'required_languages']) ?? []
    const updatedRequired = currentRequired.filter((lang: string) => lang !== locale)

    const currentFallbacks: Record<string, string[]> = form.getFieldValue(['general', 'fallback_languages']) ?? {}
    const updatedFallbacks: Record<string, string[]> = {}
    for (const [lang, fallbacks] of Object.entries(currentFallbacks)) {
      if (lang === locale) {
        continue
      }
      updatedFallbacks[lang] = fallbacks.filter((fb: string) => fb !== locale)
    }

    const currentDefault: string | undefined = form.getFieldValue(['general', 'default_language'])
    const updatedDefault = currentDefault === locale
      ? updatedLanguages[0] ?? ''
      : currentDefault

    const currentErrorPages: Record<string, unknown> | undefined = form.getFieldValue(['documents', 'error_pages', 'localized'])
    let updatedErrorPages = currentErrorPages
    if (!isNil(currentErrorPages)) {
      const { [locale]: _, ...rest } = currentErrorPages
      updatedErrorPages = rest
    }

    form.setFieldsValue({
      general: {
        valid_languages: updatedLanguages,
        required_languages: updatedRequired,
        fallback_languages: updatedFallbacks,
        default_language: updatedDefault
      },
      documents: {
        error_pages: {
          localized: updatedErrorPages
        }
      }
    })
  }

  const handleMandatoryChange = (checked: boolean): void => {
    const currentRequired = form.getFieldValue(['general', 'required_languages']) ?? []

    if (checked && currentRequired.includes(locale) === false) {
      form.setFieldsValue({
        general: {
          required_languages: [...currentRequired, locale]
        }
      })
    } else if (!checked && currentRequired.includes(locale) === true) {
      form.setFieldsValue({
        general: {
          required_languages: currentRequired.filter((lang: string) => lang !== locale)
        }
      })
    }
  }

  return (
    <Card
      actions={ [
        <IconButton
          disabled={ isOnlyLanguage }
          icon={ {
            value: 'trash'
          } }
          key={ 'icon-button-01' }
          onClick={ handleDeleteLanguage }
          title={ t('system-settings.form.localization.field.delete-language') }
          type='link'
        />
      ] }
      title={ getLanguageName({ locale }) + ` (${locale})` }
    >
      <Form.Item
        label={ t('system-settings.form.localization.field.fallback-language') }
        name={ ['general', 'fallback_languages', locale] }
      >
        <Select
          allowClear
          mode="multiple"
          options={ fallbackOptions }
          placeholder={ t('system-settings.form.localization.field.fallback-language-placeholder') }
        />
      </Form.Item>

      <Form.Item
        getValueFromEvent={ (checked: boolean) => checked ? locale : '' }
        getValueProps={ (value) => ({ checked: value === locale }) }
        name={ ['general', 'default_language'] }
        valuePropName="checked"
      >
        <Switch
          labelRight={ t('system-settings.form.localization.field.default-language') }
        />
      </Form.Item>

      <Form.Item
        shouldUpdate={ (prevValues, curValues) =>
          prevValues.general?.required_languages !== curValues.general?.required_languages
        }
      >
        {() => {
          const currentRequired = form.getFieldValue(['general', 'required_languages']) ?? []
          return (
            <Switch
              checked={ currentRequired.includes(locale) }
              labelRight={ t('system-settings.form.localization.field.mandatory') }
              onChange={ (checked) => { handleMandatoryChange(checked) } }
            />
          )
        }}
      </Form.Item>
    </Card>
  )
}
