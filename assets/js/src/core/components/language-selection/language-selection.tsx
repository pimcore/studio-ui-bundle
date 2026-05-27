/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type MouseEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Button } from '@Pimcore/components/button/button'
import { Icon } from '@Pimcore/components/icon/icon'
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { Menu } from '@Pimcore/components/menu/menu'
import { useStyle as useDropdownStyle } from '@Pimcore/components/dropdown/dropdown.styles'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { formatLocaleKey, parseLocaleLabel, transformLanguage } from '@Pimcore/components/language-selection/helpers'
import { useStyles } from './langguage-selection.styles'

interface LanguageSelectionProps {
  languages: string[]
  customKeys?: string[]
  selectedLanguage: string
  onSelectLanguage: (language: string) => void
}

export const LanguageSelection = ({ languages, customKeys = [], selectedLanguage, onSelectLanguage }: LanguageSelectionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { styles: dropdownStyles } = useDropdownStyle()

  const { validLocales } = useSettings()

  const [language, setLanguage] = useState<string>(selectedLanguage)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    setLanguage(selectedLanguage)
  }, [selectedLanguage])

  const goToNextLanguage = (e: MouseEvent): void => {
    e.stopPropagation()

    const currentIndex = languages.indexOf(language)
    const nextIndex = currentIndex === languages.length - 1 ? 0 : currentIndex + 1

    handleLanguageChange(languages[nextIndex])
  }

  const goToPreviousLanguage = (e: MouseEvent): void => {
    e.stopPropagation()

    const currentIndex = languages.indexOf(language)
    const previousIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1

    handleLanguageChange(languages[previousIndex])
  }

  const handleLanguageChange = (language: string): void => {
    setLanguage(language)
    onSelectLanguage(language)
  }

  const hasMultipleLanguages = useMemo(() => languages?.length > 1, [languages])
  const filteredLanguages = useMemo(() => {
    if (isEmptyValue(searchQuery)) {
      return languages
    }

    const normalizedQuery = searchQuery.toLowerCase().trim()

    return languages.filter((lang) => {
      const localeData: string = validLocales?.[lang] ?? validLocales?.[lang.toLowerCase()] ?? ''

      const parsed = parseLocaleLabel(localeData)
      const customLabel = customKeys.includes(lang) ? t(`custom-language.${lang}`) : ''

      const searchableValues = [lang, formatLocaleKey(lang), parsed?.name, localeData, customLabel]
        .filter(Boolean)
        .map((value) => value?.toLowerCase())

      return searchableValues.some((value) => value?.includes(normalizedQuery))
    })
  }, [languages, searchQuery, t, customKeys, validLocales])

  const languageItems = useMemo(() => {
    return filteredLanguages.map((lang) => {
      const localeData: string = validLocales?.[lang] ?? validLocales?.[lang.toLowerCase()]
      const parsed = parseLocaleLabel(localeData)
      const formattedCode = formatLocaleKey(lang)

      return {
        key: lang,
        label: (
          <Flex
            align="center"
            gap="extra-small"
            key={ lang }
          >
            { lang === '-' && (
              <Icon
                options={ { width: 16, height: 16 } }
                value='minus'
              />
            )}
            { customKeys.includes(lang) && t(`custom-language.${lang}`) }
            { lang !== '-' && !customKeys.includes(lang) && (
              <Flex
                align="center"
                className={ styles.languageDropdownItem }
                gap="extra-small"
                justify="space-between"
              >
                <Flex
                  align="center"
                  gap="mini"
                >
                  <FlagIcon value={ transformLanguage(lang) } />
                  <div>{parsed?.name ?? lang}</div>
                </Flex>
                <Flex align="center">
                  <div className={ styles.label }>{formattedCode.toUpperCase()}</div>
                </Flex>
              </Flex>
            )}
          </Flex>
        )
      }
    })
  }, [customKeys, filteredLanguages, t, validLocales])

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    handleLanguageChange(String(key))
    setDropdownOpen(false)
    setSearchQuery('')
  }

  return (
    <div className={ cn('language-select', styles.languageSelect) }>
      {hasMultipleLanguages && (
        <Button
          onClick={ goToPreviousLanguage }
          type='link'
        >
          <Icon
            className={ styles.icon }
            options={ { width: 18, height: 18 } }
            value='chevron-left'
          />
        </Button>
      )}

      <Dropdown
        dropdownRender={ () => (
          <Flex
            className={ styles.dropdownPanel }
            vertical
          >
            <div className={ styles.inputWrapper }>
              <SearchInput
                onChange={ (e) => { setSearchQuery(e.target.value) } }
                placeholder={ t('search') }
                value={ searchQuery }
                withClear
                withoutAddon
              />
            </div>

            {filteredLanguages.length > 0 ? (
              <Menu
                items={ languageItems }
                onClick={ handleMenuClick }
                rootClassName={ styles.languageList }
                selectable
                selectedKeys={ [language] }
              />
            ) : (
              <Flex
                align="center"
                className={ styles.emptyState }
                justify="center"
              >
                {t('no-languages-found')}
              </Flex>
            )}
          </Flex>
        ) }
        menu={ { items: [] } }
        onOpenChange={ (open) => {
          setDropdownOpen(open)

          if (!open) setSearchQuery('')
        } }
        open={ dropdownOpen }
        overlayClassName={ cn(dropdownStyles.dropdown) }
        trigger={ ['click'] }
      >
        <Flex
          className={ cn('language-select__current-value', styles.languageSelectValue) }
          onClick={ (e: MouseEvent) => { e.stopPropagation() } }
        >
          { language === '-' && (
            <Icon
              className={ styles.icon }
              options={ { width: 18, height: 18 } }
              value='minus'
            />
          )}

          { customKeys.includes(language) && (
            <span>{ t(`custom-language.${language}`) }</span>
          )}

          { language !== '-' && !customKeys.includes(language) && (
            <>
              <FlagIcon value={ transformLanguage(language) } />
              <span className={ styles.label }>{ formatLocaleKey(language) }</span>
            </>
          )}
        </Flex>
      </Dropdown>

      {hasMultipleLanguages && (
        <Button
          onClick={ goToNextLanguage }
          type='link'
        >
          <Icon
            className={ styles.icon }
            options={ { width: 18, height: 18 } }
            value='chevron-right'
          />
        </Button>
      )}
    </div>
  )
}
