/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { debounce, isEmpty, isUndefined } from 'lodash'
import {
  type DataObjectGetSearchApiResponse,
  useDataObjectGetSearchQuery
} from '@Pimcore/modules/search/search-api-slice.gen'
import {
  useDataObjectGetAvailableGridColumnsForRelationQuery
} from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'
import { useUserContentLanguage } from '@Pimcore/modules/auth/hooks/use-user-content-language'
import { type ManyToManyRelationValueItem } from '@Pimcore/components/many-to-many-relation/hooks/use-value'
import { type ManyToManyObjectRelationProps, type VisibleFieldDefinition } from '../../../many-to-many-object-relation'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useDataObjectDraft } from '@Pimcore/modules/data-object/hooks/use-data-object-draft'
import { useClassDefinitionSelectionOptional } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { processItems } from '../combo-field-utils'

export const COMBO_PAGE_SIZE = 200
export const BACKGROUND_LOAD_THRESHOLD = 1000

const SEARCH_DEBOUNCE_MS = 300
const FULLTEXT_FILTER_TYPE = 'system.fulltext'

const SYSTEM_COLUMNS = [
  { key: 'fullpath', type: 'system.string', locale: null, config: [] as string[] },
  { key: 'classname', type: 'system.string', locale: null, config: [] as string[] }
]

export interface ComboOption {
  value: number
  label: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useComboFieldData = (props: ManyToManyObjectRelationProps) => {
  const { getByName } = useClassDefinitions()
  const userLanguage = useUserContentLanguage()

  const { id: elementId } = useElementContext()
  const { dataObject } = useDataObjectDraft(elementId)
  const listingClassSelection = useClassDefinitionSelectionOptional()
  const editorClassId = !isUndefined(dataObject) ? getByName(dataObject.className)?.id : undefined
  const listingClassId = listingClassSelection?.selectedClassDefinition?.id
  // Inline edit has no editor draft for the row, so fall back to the
  // listing's selected class (mirrors the regular relation grid component).
  const containingClassId = listingClassId ?? editorClassId ?? ''
  const relationField = props.combinedFieldName

  const { data: availableColumnsData, isLoading: isColumnsLoading } = useDataObjectGetAvailableGridColumnsForRelationQuery(
    { classId: containingClassId, relationField: relationField ?? '' },
    { skip: containingClassId === '' || isUndefined(relationField) }
  )

  const resolvedVisibleDefs = useMemo<VisibleFieldDefinition[]>(() => {
    if (isColumnsLoading) return []
    const columns = availableColumnsData?.columns
    if (isUndefined(columns) || isEmpty(columns)) return []
    return (Array.isArray(columns) ? columns : Object.values(columns)) as VisibleFieldDefinition[]
  }, [availableColumnsData, isColumnsLoading])

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [accumulatedOptions, setAccumulatedOptions] = useState<ComboOption[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [allItemsLoaded, setAllItemsLoaded] = useState(false)
  const [unfilteredTotal, setUnfilteredTotal] = useState<number | undefined>(undefined)
  const [labelCache, setLabelCache] = useState<Map<number, string>>(new Map())

  const backgroundLoadEnabled = unfilteredTotal !== undefined && unfilteredTotal <= BACKGROUND_LOAD_THRESHOLD

  const itemMapRef = useRef<Map<number, ManyToManyRelationValueItem>>(new Map())
  const prevDataRef = useRef<DataObjectGetSearchApiResponse | undefined>(undefined)

  useEffect(() => {
    props.value?.forEach(item => { itemMapRef.current.set(item.id, item) })
  }, [props.value])

  useEffect(() => {
    if (allItemsLoaded) return
    setPage(1)
    setAccumulatedOptions([])
    setHasMore(true)
    prevDataRef.current = undefined
  }, [searchTerm, allItemsLoaded])

  const searchClassId = useMemo(() => {
    if (props.allowedClasses?.length === 1) {
      return getByName(props.allowedClasses[0])?.id
    }
    return undefined
  }, [props.allowedClasses, getByName])

  const sortFilter = useMemo(() => {
    const firstSortable = resolvedVisibleDefs.find(fd => fd.sortable)
    if (firstSortable !== undefined) {
      return {
        key: firstSortable.key,
        direction: 'ASC',
        ...(firstSortable.localizable ? { locale: userLanguage } : {})
      }
    }
    return { key: 'fullpath', direction: 'ASC' }
  }, [resolvedVisibleDefs, userLanguage])

  const columnsToRequest = useMemo(() => {
    const extra = resolvedVisibleDefs
      .filter(fieldDef => Boolean(fieldDef.key) && Boolean(fieldDef.type))
      .map(fieldDef => ({
        key: fieldDef.key,
        type: fieldDef.type,
        locale: fieldDef.localizable ? userLanguage : (fieldDef.locale ?? null),
        config: Array.isArray(fieldDef.config) ? fieldDef.config as string[] : []
      }))

    const systemKeys = new Set(SYSTEM_COLUMNS.map(c => c.key))
    return [...SYSTEM_COLUMNS, ...extra.filter(c => !systemKeys.has(c.key))]
  }, [resolvedVisibleDefs, userLanguage])

  useEffect(() => {
    setPage(1)
    setAllItemsLoaded(false)
    setHasMore(true)
    prevDataRef.current = undefined
  }, [columnsToRequest])

  const { data, isFetching } = useDataObjectGetSearchQuery(
    {
      classId: searchClassId,
      body: {
        columns: columnsToRequest,
        filters: {
          page,
          pageSize: COMBO_PAGE_SIZE,
          includeDescendants: true,
          sortFilter,
          columnFilters: searchTerm !== ''
            ? [{ type: FULLTEXT_FILTER_TYPE, filterValue: searchTerm }]
            : []
        }
      }
    },
    { skip: allItemsLoaded || isColumnsLoading || (!backgroundLoadEnabled && !isOpen && page > 1) }
  )

  const selectedIds = useMemo<number[]>(() => {
    return (props.value ?? []).map(item => item.id)
  }, [props.value])

  const missingLabelIds = useMemo<number[]>(() => {
    return selectedIds.filter(id => !labelCache.has(id))
  }, [selectedIds, labelCache])

  const { data: preSelectedData, isFetching: isPreSelectedFetching } = useDataObjectGetSearchQuery(
    {
      classId: searchClassId,
      body: {
        columns: columnsToRequest,
        filters: {
          page: 1,
          pageSize: missingLabelIds.length,
          includeDescendants: true,
          columnFilters: [{ type: 'system.ids', filterValue: missingLabelIds }]
        }
      }
    },
    { skip: missingLabelIds.length === 0 || isColumnsLoading }
  )

  useEffect(() => {
    if (!preSelectedData?.items?.length) return
    const newLabels = processItems(preSelectedData.items, resolvedVisibleDefs, itemMapRef.current)
    setLabelCache(prev => new Map([...prev, ...newLabels]))
  }, [preSelectedData, resolvedVisibleDefs])

  useEffect(() => {
    if (isFetching || data === undefined || data === prevDataRef.current) return
    prevDataRef.current = data

    const newLabels = processItems(data.items ?? [], resolvedVisibleDefs, itemMapRef.current)
    const newOpts = [...newLabels.entries()].map(([id, label]) => ({ value: id, label }))

    setLabelCache(prev => new Map([...prev, ...newLabels]))
    setAccumulatedOptions(prev => {
      if (page === 1) return newOpts
      const existingIds = new Set(prev.map(o => o.value))
      return [...prev, ...newOpts.filter(o => !existingIds.has(o.value))]
    })

    const total = data.totalItems ?? 0
    setHasMore(total > page * COMBO_PAGE_SIZE)
    if (searchTerm === '') setUnfilteredTotal(total)
  }, [data, isFetching, resolvedVisibleDefs, page])

  const shouldMarkAllLoaded = !hasMore && searchTerm === '' && !isColumnsLoading && accumulatedOptions.length > 0
  useEffect(() => {
    if (shouldMarkAllLoaded) setAllItemsLoaded(true)
  }, [shouldMarkAllLoaded])

  useEffect(() => {
    if (!backgroundLoadEnabled || isFetching || isColumnsLoading || !hasMore || allItemsLoaded || accumulatedOptions.length === 0) return
    setPage(prev => prev + 1)
  }, [backgroundLoadEnabled, isFetching, isColumnsLoading, hasMore, allItemsLoaded, accumulatedOptions.length])

  const existingOptions = useMemo<ComboOption[]>(() => {
    return (props.value ?? []).map(item => ({
      value: item.id,
      label: labelCache.get(item.id) ?? item.fullPath
    }))
  }, [props.value, labelCache])

  const options = useMemo<ComboOption[]>(() => {
    if (searchTerm !== '') return accumulatedOptions
    const searchIds = new Set(accumulatedOptions.map(o => o.value))
    return [...accumulatedOptions, ...existingOptions.filter(o => !searchIds.has(o.value))]
  }, [accumulatedOptions, existingOptions, searchTerm])

  const debouncedSetSearch = useCallback(
    debounce((value: string) => { setSearchTerm(value) }, SEARCH_DEBOUNCE_MS),
    []
  )

  const handleSearch = useCallback((value: string): void => {
    if (value === '') {
      debouncedSetSearch.cancel()
      setSearchTerm('')
    } else {
      debouncedSetSearch(value)
    }
  }, [debouncedSetSearch])

  const handleDropdownVisibleChange = (open: boolean): void => {
    setIsOpen(open)
    if (!open) {
      setSearchTerm('')
      setPage(1)
      setAccumulatedOptions([])
      setAllItemsLoaded(false)
      prevDataRef.current = undefined
    }
  }

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const el = e.currentTarget
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100 && !isFetching && hasMore) {
      setPage(prev => prev + 1)
    }
  }

  const handleSelect = (id: number): void => {
    const item = itemMapRef.current.get(id)
    if (item === undefined) return
    props.onChange?.([...(props.value ?? []), item])
  }

  const handleDeselect = (id: number): void => {
    props.onChange?.((props.value ?? []).filter(item => item.id !== id))
  }

  const localFilterOption = useCallback(
    (input: string, option?: ComboOption): boolean =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
    []
  )

  const isLoadingInitialLabels = selectedIds.length > 0 && (isColumnsLoading || isPreSelectedFetching)

  return {
    options,
    selectedIds,
    isFetching,
    allItemsLoaded,
    accumulatedOptions,
    unfilteredTotal,
    backgroundLoadEnabled,
    isLoadingInitialLabels,
    searchTerm,
    isDisabled: props.disabled === true,
    handleSearch,
    handleDropdownVisibleChange,
    handlePopupScroll,
    handleSelect,
    handleDeselect,
    localFilterOption
  }
}
