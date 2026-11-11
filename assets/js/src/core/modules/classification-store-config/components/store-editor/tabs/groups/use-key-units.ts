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
import { useQuantityValueUnits } from '@Pimcore/modules/data-object/hooks/use-quantity-value-units'
import { useUnitQuantityValueListQuery } from '@Pimcore/modules/data-object/unit-slice.gen'
import { type IKeyUnits } from './key-override'

export const useKeyUnits = (): IKeyUnits => {
  const { getAbbreviation, getSelectOptions } = useQuantityValueUnits()
  const { data } = useUnitQuantityValueListQuery()

  // The list is what both results depend on; the hook's functions are new on every render.
  return useMemo(() => ({
    installationUnits: getSelectOptions().map((option) => String(option.value)),
    unitLabel: (id: string) => {
      const abbreviation = getAbbreviation(id)

      return abbreviation === '' ? id : abbreviation
    }
  }), [data])
}
