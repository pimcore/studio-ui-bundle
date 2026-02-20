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
import { useClassificationStoreGetConfigCollectionQuery } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

export interface SelectOption {
  label: string
  value: number
}

export interface UseClassificationStoreOptionsReturn {
  options: SelectOption[]
  refetch: () => void
  isLoading: boolean
}

export const useClassificationStoreOptions = (): UseClassificationStoreOptionsReturn => {
  const { data, refetch, isFetching } = useClassificationStoreGetConfigCollectionQuery()

  const options = useMemo(() => {
    if (data?.items === undefined) {
      return []
    }

    return data.items.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }, [data])

  return {
    options,
    refetch: refetch ?? (() => {}),
    isLoading: isFetching
  }
}
