/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { map, filter, isEmpty, isUndefined } from 'lodash'
import { type TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import {
  type DataObjectGetGridApiArg,
  type DataObjectGetGridApiResponse,
  type GridColumnRequest,
  useDataObjectGetGridQuery
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { type UseClassDefinitionsReturn } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'

interface IUseDataObjectGridsProps {
  classIds?: string[]
  convertClassName: UseClassDefinitionsReturn['getByName']
  columns?: GridColumnRequest[]
  dataValue?: ManyToManyRelationValue | null
}

export const useDataObjectGrids = ({ classIds, convertClassName, columns, dataValue }: IUseDataObjectGridsProps): Array<TypedUseQueryHookResult<DataObjectGetGridApiResponse, DataObjectGetGridApiArg, any, any>> => {
  return (classIds ?? []).map((classId: string) =>
    useDataObjectGetGridQuery(
      {
        classId: convertClassName(classId)?.id ?? '',
        body: {
          folderId: 1,
          columns,
          filters: {
            page: 1,
            pageSize: 999,
            includeDescendants: true,
            columnFilters: [
              {
                type: 'system.ids',
                filterValue: map(
                  filter(dataValue, { subtype: classId }),
                  'id'
                )
              }
            ]
          }
        }
      },
      { skip: isUndefined(classIds) && isEmpty(dataValue) }
    )
  )
}
