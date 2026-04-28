/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { map, filter, isEmpty } from 'lodash'
import {
  type DataObjectGetGridApiResponse,
  type GridColumnRequest,
  useDataObjectGetGridQuery
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { type UseClassDefinitionsReturn } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

interface IUseDataObjectGridsProps {
  classIds?: string[]
  convertClassName: UseClassDefinitionsReturn['getByName']
  columns?: GridColumnRequest[]
  applyFallbackLanguages?: boolean
  dataValue?: ManyToManyRelationValue | null
}

export interface IUseDataObjectGridsReturn {
  isLoading: boolean
  data: DataObjectGetGridApiResponse['items']
  refetchAll: () => void
}

export const useDataObjectGrids = ({ classIds, convertClassName, columns, applyFallbackLanguages, dataValue }: IUseDataObjectGridsProps): IUseDataObjectGridsReturn => {
  const queries = (classIds ?? []).map((classId: string) => {
    const filterValue = map(
      filter(dataValue, { subtype: classId }),
      'id'
    )

    return useDataObjectGetGridQuery(
      {
        classId: convertClassName(classId)?.id ?? '',
        body: {
          folderId: 1,
          applyFallbackLanguages,
          columns,
          filters: {
            page: 1,
            pageSize: 999,
            includeDescendants: true,
            columnFilters: [
              {
                type: 'system.ids',
                filterValue
              }
            ]
          }
        }
      },
      { skip: isEmpty(columns) || isEmptyValue(filterValue), refetchOnMountOrArgChange: true }
    )
  })

  const isLoading = queries.some(q => q.isLoading || q.isFetching)
  const data = queries.flatMap(q => q.data?.items ?? [])
  const refetchAll = (): void => { queries.forEach(q => { void q.refetch() }) }

  return { isLoading, data, refetchAll }
}
