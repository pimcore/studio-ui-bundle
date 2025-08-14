/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React, { useEffect } from 'react'
import { SelectCell, type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { ApiError, GeneralError, trackError } from '@sdk/modules/app'
import { isUndefined, isArray } from 'lodash'
import { useUserGetCurrentInformationQuery } from '@Pimcore/modules/user/user-api-slice-enhanced'

export const LanguageCell = (props: DefaultCellProps): React.JSX.Element => {
  const settings = useSettings()
  const { data: userInfo, error } = useUserGetCurrentInformationQuery()

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const availableLanguages = settings.availableAdminLanguages
  const allowedLanguagesForViewingTranslations = userInfo?.allowedLanguagesForViewingWebsiteTranslations as Array<{ language: string, display: string }> | undefined
  const languageSelectionOptions = (isArray(allowedLanguagesForViewingTranslations) ? allowedLanguagesForViewingTranslations : [])?.map(lang => {
    const match = availableLanguages.find(availableLang => availableLang.language === lang.language)
    if (isUndefined(match)) {
      trackError(new GeneralError(`Language "${lang.language}" not found in availableLanguages`))
    }
    return ({
      value: match?.language ?? lang.language,
      label: `${match?.display ?? lang.display} [${lang.language}]`,
      displayValue: lang.language
    })
  }) ?? []

  const columnConfig: SelectCellConfig = {
    options: languageSelectionOptions
  }

  return (
    <SelectCell { ...addColumnConfig(props, columnConfig) } />
  )
}
