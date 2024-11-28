/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useClassQuantityValueUnitListQuery } from '@Pimcore/modules/data-object/quantity-value-units-api-slice.gen'
import { type DefaultOptionType } from 'rc-select/lib/Select'
import { useTranslation } from 'react-i18next'

interface UseQuantityValueUnitsReturn {
  getSelectOptions: (validUnits?: string[]) => DefaultOptionType[]
}

export const useQuantityValueUnits = (): UseQuantityValueUnitsReturn => {
  const { data: units } = useClassQuantityValueUnitListQuery()
  const { t } = useTranslation()

  const getSelectOptions = (validUnits?: string[]): DefaultOptionType[] => {
    if (units?.items === undefined) {
      return []
    }

    return units
      .items
      .filter(unit => validUnits === undefined || (unit.id !== null && validUnits.includes(unit.id)))
      .map(unit => ({
        label: unit.abbreviation === null ? unit.id : t(unit.abbreviation),
        value: unit.id
      }))
  }

  return { getSelectOptions }
}
