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
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'

export const useVisibleFieldsOptions = (classes: string[]): Array<{ label: string, value: string }> => {
  const { getById } = useClassDefinitions()

  const classNames = useMemo(() => {
    return classes.map((id) => getById(id)?.name).filter(Boolean).join(',')
  }, [classes, getById])

  const { data } = useClassGetAvailableVisibleFieldsQuery({ classNames }, { skip: classNames.length === 0 })

  return useMemo(() => {
    return data?.items.map((item) => ({
      label: item.key,
      value: item.key
    })) ?? []
  }, [data])
}
