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
import { useClassFieldCollectionCollectionQuery } from '@sdk/api/class-definition'

export interface SelectOption {
  label: string
  value: string
}

export interface UseFieldCollectionOptionsReturn {
  options: SelectOption[]
  refetch: () => void
  isLoading: boolean
}

export const useFieldCollectionOptions = (): UseFieldCollectionOptionsReturn => {
  const { data, refetch, isFetching } = useClassFieldCollectionCollectionQuery()

  const options = useMemo(() => {
    if (data?.items === undefined) {
      return []
    }

    return data.items.map((item) => ({
      label: item.key,
      value: item.key
    }))
  }, [data])

  return {
    options,
    refetch: refetch ?? (() => {}),
    isLoading: isFetching
  }
}
