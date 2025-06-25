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
import React from 'react'
import { SelectCell, type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { GeneralError, trackError } from '@sdk/modules/app'

export const LanguageCell = (props: DefaultCellProps): React.JSX.Element => {
  const settings = useSettings()

  const availableLanguages = settings.availableAdminLanguages
  const validLanguages: string[] = settings.validLanguages

  const languageSelectionOptions = validLanguages.map(validLang => {
    const match = availableLanguages.find(lang => lang.language === validLang)
    if (!match) {
      trackError(new GeneralError(`Language "${validLang}" not found in availableLanguages`))
    }
    return ({
      value: match.language,
      label: `${match.display} [${match.language}]`,
      displayValue: match.language
    })
  })

  const columnConfig: SelectCellConfig = {
    options: languageSelectionOptions
  }

  return (
    <SelectCell { ...addColumnConfig(props, columnConfig) } />
  )
}
