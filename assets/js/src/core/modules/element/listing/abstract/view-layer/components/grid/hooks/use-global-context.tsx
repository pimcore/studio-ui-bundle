/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useMemo } from 'react'
import { find, get, isNil } from 'lodash'
import { type RowSelectionState } from '@tanstack/react-table'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useGlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'

export const useGlobalContext = ({ data, selectedRows, elementType }: { data: any, selectedRows?: RowSelectionState, elementType: ElementType }): void => {
  const { setContext: setGlobalDataObjectContext, context: globalDataObjectContext } = useGlobalDataObjectContext()

  const selectedIds = useMemo(
    () => (!isNil(selectedRows) ? Object.keys(selectedRows).map(Number) : []),
    [selectedRows]
  )

  useEffect(() => {
    if (isEmptyValue(data) || isEmptyValue(selectedIds)) return

    selectedIds.forEach((id): void => {
      const rowData = data?.find((row: any) => row.id === id)

      switch (elementType) {
        case 'data-object': {
          const className = get(find(rowData?.columns, { key: 'classname' }), 'value')

          if (!isEmptyValue(className)) {
            const newContextValue = `object_${className}_selection`.toLowerCase()

            if (globalDataObjectContext?.config.context.includes(newContextValue) === false) {
              setGlobalDataObjectContext({
                context: [newContextValue]
              })
            }
          }
          break
        }
        default:
          break
      }
    })
  }, [data, selectedIds, elementType, setGlobalDataObjectContext])
}
