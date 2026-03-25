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
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'

export const LanguageCell = (props: DefaultCellProps): React.JSX.Element => {
  const settings = useSettings()
  const { getDisplayName } = useLanguageLookup()

  const validLanguages: string[] = settings.validLanguages
  const languageSelectionOptions = validLanguages.map(locale => ({
    value: locale,
    label: `${getDisplayName(locale)} [${locale}]`,
    displayValue: locale
  }))

  const existingConfig = props.column.columnDef.meta?.config as SelectCellConfig | undefined
  const columnConfig: SelectCellConfig = {
    options: languageSelectionOptions,
    allowClear: existingConfig?.allowClear
  }

  return (
    <SelectCell { ...addColumnConfig(props, columnConfig) } />
  )
}
