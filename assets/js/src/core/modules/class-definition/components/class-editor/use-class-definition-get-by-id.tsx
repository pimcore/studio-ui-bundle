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
import { useClassDefinitionGetByIdQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { toElementIcon } from '@Pimcore/components/icon-selector/utils/element-icon'
import { type AnyQueryHook } from 'types/react-query'

type QueryArg = Parameters<typeof useClassDefinitionGetByIdQuery>[0]

export const useClassDefinitionGetById = ((arg: QueryArg) => {
  const result = useClassDefinitionGetByIdQuery(arg)

  const data = useMemo(() => {
    if (result.data === undefined) {
      return result.data
    }

    return {
      ...result.data,
      icon: toElementIcon(result.data.icon as Parameters<typeof toElementIcon>[0])
    }
  }, [result.data])

  return { ...result, data }
}) as AnyQueryHook
