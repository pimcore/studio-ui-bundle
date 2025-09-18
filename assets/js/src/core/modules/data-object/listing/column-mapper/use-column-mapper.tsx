/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useRef, useCallback } from 'react'
import { useLanguageSelection } from '@Pimcore/components/language-selection'
import { useColumnMapper, type UseColumnMapperReturn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-column-mapper'

export const useDataObjectColumnMapper = (): UseColumnMapperReturn => {
  const languageSelection = useLanguageSelection()
  const currentLanguageRef = useRef(languageSelection.currentLanguage)
  const { shouldMapDataToColumn: baseShouldMapDataToColumn, ...props } = useColumnMapper()
  currentLanguageRef.current = languageSelection.currentLanguage

  const shouldMapDataToColumn: UseColumnMapperReturn['shouldMapDataToColumn'] = useCallback((data, column) => {
    const currentLanguage = currentLanguageRef.current

    if (column.localizable && (column.locale === null || column.locale === undefined)) {
      return data.key === column.key && currentLanguage === data.locale
    }

    return baseShouldMapDataToColumn(data, column)
  }, [baseShouldMapDataToColumn])

  return {
    ...props,
    shouldMapDataToColumn
  }
}
