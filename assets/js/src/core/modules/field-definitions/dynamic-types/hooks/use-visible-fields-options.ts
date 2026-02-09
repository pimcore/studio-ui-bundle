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
import { useClassGetAvailableVisibleFieldsQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'

export const useVisibleFieldsOptions = (classes: string[]): Array<{ label: string, value: string }> => {
  const classNames = useMemo(() => classes.join(','), [classes])
  const { data } = useClassGetAvailableVisibleFieldsQuery({ classNames }, { skip: classes.length === 0 })

  return useMemo(() => {
    return data?.items.map((item) => ({
      label: item.key,
      value: item.key
    })) ?? []
  }, [data])
}
