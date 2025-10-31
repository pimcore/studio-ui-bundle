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
import { find, get, isEmpty, isNil, uniq } from 'lodash'
import { type RowSelectionState } from '@tanstack/react-table'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useGlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'

export const useGlobalContext = ({ data, selectedRows, elementType }: { data: any, selectedRows?: RowSelectionState, elementType: ElementType }): void => {
  const { context: globalDataObjectContext, setContext: setGlobalDataObjectContext } = useGlobalDataObjectContext()

  const selectedIds = useMemo(
    () => (!isNil(selectedRows) ? Object.keys(selectedRows).map(Number) : []),
    [selectedRows]
  )

  useEffect(() => {
    if (isEmptyValue(data)) return

    switch (elementType) {
      case 'data-object': {
        const currentContext = globalDataObjectContext?.config?.context ?? []
        const baseContext = currentContext.filter(item => !item.includes('_selection'))

        if (isEmpty(selectedIds) && (currentContext.length > baseContext.length)) {
          setGlobalDataObjectContext({
            context: baseContext
          })

          break
        }

        if (!isEmpty(selectedIds)) {
          const newContextValues: string[] = []

          selectedIds.forEach((id): void => {
            const rowData = data?.find((row: any) => row.id === id)
            const className = get(find(rowData?.columns, { key: 'classname' }), 'value')

            if (!isEmptyValue(className)) {
              const newContextValue = `object_${className}_selection`.toLowerCase()

              newContextValues.push(newContextValue)
            }
          })

          if (newContextValues.length > 0) {
            const filteredContext = (globalDataObjectContext?.config?.context ?? []).filter(
              (context) => !context.endsWith('_selection')
            )
            const updatedContext = uniq([...filteredContext, ...newContextValues])

            if (JSON.stringify(globalDataObjectContext?.config?.context) !== JSON.stringify(updatedContext)) {
              setGlobalDataObjectContext({
                context: updatedContext
              })
            }
          }
        }
      }
    }
  }, [data, selectedIds, elementType, setGlobalDataObjectContext])
}
