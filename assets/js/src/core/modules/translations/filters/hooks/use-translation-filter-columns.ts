/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useTranslationGetDomainsQuery } from '@Pimcore/modules/app/translations/translations-api-slice-enhanced'
import { useTranslationDomain } from '@Pimcore/modules/translations/hooks/translation-domain-provider'
import { useWebsiteTranslationLanguages, useAdminTranslationLanguages } from '@Pimcore/modules/translations/hooks/use-translation-languages'
import { type TranslationFilterColumn } from '@Pimcore/modules/translations/filters/types'

export const LANGUAGE_COLUMN_FILTER_TYPE = 'translationLike'

export const useTranslationFilterColumns = (): TranslationFilterColumn[] => {
  const { domain } = useTranslationDomain()
  const { data: domainsData } = useTranslationGetDomainsQuery()

  const isFrontendDomain = (domainsData ?? []).find((d) => d.domain === domain)?.isFrontendDomain ?? false

  const websiteLanguages = useWebsiteTranslationLanguages()
  const adminLanguages = useAdminTranslationLanguages()
  const { languages } = isFrontendDomain ? websiteLanguages : adminLanguages

  const viewableLanguages = languages.filter((language) => language.canView)
  const signature = viewableLanguages.map((language) => `${language.locale}:${language.displayName}`).join('|')

  return useMemo(() => viewableLanguages.map((language) => ({
    key: language.locale,
    label: language.displayName,
    type: LANGUAGE_COLUMN_FILTER_TYPE,
    frontendType: 'string'
  })),
  [signature])
}
