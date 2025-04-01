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

import { useEffect, useState } from 'react'
import { useMetadataGetCollectionQuery } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice-enhanced'
import { isString, isNil } from 'lodash'
import {
  type SelectOptionType
} from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'

export const useMetadataSelectOptions = (fieldName: string): { isLoading: boolean, options: SelectOptionType[] } => {
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { data, isFetching } = useMetadataGetCollectionQuery({ body: {} })

  useEffect(() => {
    if (!isNil(data?.items)) {
      const field = data.items.find((item) => item.name === fieldName)
      if (isString(field?.config)) {
        const resolvedOptions = field.config.split(',').map((option: string) => ({
          label: option.trim(),
          value: option.trim()
        }))
        setOptions(resolvedOptions)
      }
    }
  }, [data, fieldName])

  console.log('foundselect return', fieldName, { isLoading: isFetching, options })
  return { isLoading: isFetching, options }
}
