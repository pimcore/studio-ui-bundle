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
import { useAssetGetTypesQuery } from '@Pimcore/modules/asset/asset-api-slice.gen'

export const useAssetTypeOptions = (): Array<{ label: string, value: string }> => {
  const { data } = useAssetGetTypesQuery()

  return useMemo(() => {
    return data?.items.map((item) => ({
      label: item.key,
      value: item.key
    })) ?? []
  }, [data])
}
