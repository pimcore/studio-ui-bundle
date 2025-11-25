/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useLayoutEffect, useMemo } from 'react'
import { find, get, isEmpty, isEqual, isNil, isNull, uniq } from 'lodash'
import { type RowSelectionState } from '@tanstack/react-table'
import { type ElementType, elementTypes } from '@Pimcore/types/enums/element/element-type'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useGlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'
import { useGlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { useGlobalDocumentContext } from '@Pimcore/modules/document/hooks/use-global-document-context'
import { type GlobalElementContext } from '@Pimcore/modules/element/hooks/use-global-element-context'
import {
  ASSET_CONTEXT_IDENTIFIER_PREFIX,
  DOCUMENT_CONTEXT_IDENTIFIER_PREFIX,
  OBJECT_CONTEXT_IDENTIFIER_PREFIX
} from '@Pimcore/utils/global-context-identifiers'

export const useGlobalContextIdentifiers = ({ data, selectedRows, elementType }: { data: any, selectedRows?: RowSelectionState, elementType: ElementType }): void => {
  const { context: globalDataObjectContext, setContext: setGlobalDataObjectContext } = useGlobalDataObjectContext()
  const { context: globalAssetContext, setContext: setGlobalAssetContext } = useGlobalAssetContext()
  const { context: globalDocumentContext, setContext: setGlobalDocumentContext } = useGlobalDocumentContext()

  const selectedIds = useMemo(
    () => (!isNil(selectedRows) ? Object.keys(selectedRows).map(Number) : []),
    [selectedRows]
  )

  const getContextByType = (): { context: GlobalElementContext, setContext: (config: GlobalElementContext['config']) => void } => {
    switch (elementType) {
      case elementTypes.dataObject:
        return { context: globalDataObjectContext!, setContext: setGlobalDataObjectContext }
      case elementTypes.asset:
        return { context: globalAssetContext!, setContext: setGlobalAssetContext }
      case elementTypes.document:
        return { context: globalDocumentContext!, setContext: setGlobalDocumentContext }

      default:
        return { context: globalDataObjectContext!, setContext: setGlobalDataObjectContext }
    }
  }

  const getSelectionContextKey = (rowData: any): string | null => {
    const type = get(find(rowData?.columns, { key: 'type' }), 'value')
    const className = get(find(rowData?.columns, { key: 'classname' }), 'value')

    switch (elementType) {
      case elementTypes.dataObject:
        return !isEmptyValue(className) ? `${OBJECT_CONTEXT_IDENTIFIER_PREFIX}_${className}_selection`.toLowerCase() : null
      case elementTypes.asset:
        return !isEmptyValue(type) ? `${ASSET_CONTEXT_IDENTIFIER_PREFIX}_${type}_selection`.toLowerCase() : null
      case elementTypes.document:
        return !isEmptyValue(type) ? `${DOCUMENT_CONTEXT_IDENTIFIER_PREFIX}_${type}_selection`.toLowerCase() : null
      default:
        return null
    }
  }

  useLayoutEffect(() => {
    if (isEmptyValue(data)) return

    const { context, setContext } = getContextByType()

    const currentContext = context?.config?.contextIdentifiers ?? {}

    const allTags = currentContext?.tags ?? []
    const baseTags = currentContext?.tags.filter(item => !item.includes('_selection'))

    if (isEmpty(selectedIds) && !isNil(context) && allTags.length > baseTags.length) {
      setContext({
        id: context.config.id,
        contextIdentifiers: {
          ...currentContext,
          tags: baseTags
        }
      })

      return
    }

    if (!isEmpty(selectedIds)) {
      const newSelectedElementsContext: Array<{ id: number, type: string }> = []
      const newTagContext: string[] = []

      selectedIds.forEach((id) => {
        const rowData = data?.find((row: any) => row.id === id)
        const key = getSelectionContextKey(rowData)

        newSelectedElementsContext.push({ id, type: currentContext?.type })

        if (!isNull(key)) newTagContext.push(key)
      })

      if (newTagContext.length > 0) {
        const filteredTagContext = currentContext?.tags.filter((context) => !context.endsWith('_selection'))
        const updatedTagContext = uniq([...filteredTagContext, ...newTagContext])

        const isSameTags = isEqual(currentContext.tags, newTagContext)
        const isSameSelected = isEqual(currentContext.selectedElements, newSelectedElementsContext)

        const isSame = isSameTags || isSameSelected

        if (!isSame && !isNil(context)) {
          setContext({
            id: context.config.id,
            contextIdentifiers: {
              ...currentContext,
              tags: updatedTagContext,
              selectedElements: newSelectedElementsContext
            }
          })
        }
      }
    }
  }, [data, selectedIds, elementType])
}
