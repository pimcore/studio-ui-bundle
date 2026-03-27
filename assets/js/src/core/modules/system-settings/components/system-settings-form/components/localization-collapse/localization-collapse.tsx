/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { CollapseItem } from '@Pimcore/components/collapse/collapse'
import { useSystemSettingsContext } from '@Pimcore/modules/system-settings/context/hooks/use-system-settings-context'
import { Flex, IconButton } from '@sdk/components'
import { isNil } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageForm } from './components/language-form/language-form'
import { LanguageSelect } from './components/language-select/language-select'

export const LocalizationCollapse = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { form } = useSystemSettingsContext()
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>()

  const handleAddLanguage = (): void => {
    if (isNil(selectedLanguage)) {
      return
    }

    const normalizedLanguage = selectedLanguage.replaceAll('-', '_')
    const currentLanguages = (form.getFieldValue(['general', 'valid_languages']) ?? []) as string[]
    if (!currentLanguages.includes(normalizedLanguage)) {
      const currentFallbacks = (form.getFieldValue(['general', 'fallback_languages']) ?? {}) as Record<string, string[]>
      form.setFieldsValue({
        general: {
          valid_languages: [...currentLanguages, normalizedLanguage],
          fallback_languages: { ...currentFallbacks, [normalizedLanguage]: [] }
        }
      })
      setSelectedLanguage(undefined)
    }
  }

  return (
    <CollapseItem
      forceRender
      label={ t('system-settings.collapse.localization') }
    >
      <Flex
        gap={ 'small' }
        vertical
      >
        <Flex gap={ 'extra-small' }>
          <LanguageSelect
            onChange={ setSelectedLanguage }
            placeholder={ t('system-settings.form.localization.field.add-language') }
            value={ selectedLanguage }
          />
          <IconButton
            disabled={ isNil(selectedLanguage) }
            icon={ {
              value: 'plus-circle'
            } }
            onClick={ handleAddLanguage }
            type="primary"
          />
        </Flex>

        <LanguageForm />
      </Flex>
    </CollapseItem>
  )
}
