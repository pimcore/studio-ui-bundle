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
import { useClassGetAvailableVisibleFieldsQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'

export const useVisibleFieldsOptions = (classNames: string[]): { options: Array<{ label: string, value: string }>, refetch: () => void, isLoading: boolean } => {
  const { data, refetch, isFetching } = useClassGetAvailableVisibleFieldsQuery({ classNames: classNames.join(',') }, { skip: classNames.length === 0, refetchOnMountOrArgChange: true })

  const options = useMemo(() => {
    return data?.items.map((item) => ({
      label: item.key,
      value: item.key
    })) ?? []
  }, [data])

  return {
    options,
    refetch: refetch ?? (() => {}),
    isLoading: isFetching
  }
}
