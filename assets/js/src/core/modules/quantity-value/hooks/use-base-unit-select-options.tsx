/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useUnitQuantityValueListQuery } from '@Pimcore/modules/data-object/unit-slice-enhanced'
import { type SelectOptionType } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'
import { useMemo } from 'react'

export const useBaseUnitSelectOptions = (): { isLoading: boolean, options: SelectOptionType[] } | undefined => {
  const { data, isLoading, isFetching } = useUnitQuantityValueListQuery()

  const options = useMemo(() =>
    data?.items
      ?.filter(unit => unit.id !== null)
      .map(unit => ({
        value: unit.id!,
        label: unit.abbreviation ?? unit.id ?? ''
      })) ?? [],
  [data]
  )

  return {
    isLoading: isLoading || isFetching,
    options
  }
}
