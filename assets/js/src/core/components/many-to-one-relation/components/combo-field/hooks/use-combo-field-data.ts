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
import { debounce, isNil } from 'lodash'
import { useDataObjectGetSearchQuery } from '@Pimcore/modules/search/search-api-slice.gen'
import { useClassDefinitionCollectionQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useFormatPath } from '@Pimcore/modules/data-object/hooks/use-format-path'
import { type ManyToOneRelationValueType } from '../../../many-to-one-relation'

export const COMBO_PAGE_SIZE = 200

const SEARCH_DEBOUNCE_MS = 300

const FULLTEXT_FILTER_TYPE = 'system.fulltext'

const COLUMN_FULLPATH = 'fullpath'

const COLUMN_CLASSNAME = 'classname'

const SYSTEM_COLUMNS = [
  { key: COLUMN_FULLPATH, type: 'system.string', locale: null, config: [] as string[] },
  { key: COLUMN_CLASSNAME, type: 'system.string', locale: null, config: [] as string[] }
]

export interface ComboOption {
  value: number
  label: string
}

export interface ComboHit {
  id: number
  fullPath: string
  className: string
}

export interface UseComboFieldDataProps {
  allowedClasses?: string[]
  value?: ManyToOneRelationValueType
  pathFormatterClass?: string
  combinedFieldName?: string
  /** Concrete object the path formatter is resolved against. */
  objectId?: number
}

export interface UseComboFieldDataReturn {
  options: ComboOption[]
  isFetching: boolean
  hitById: (id: number) => ComboHit | undefined
  handleSearch: (value: string) => void
  handleDropdownVisibleChange: (open: boolean) => void
  handlePopupScroll: (event: React.UIEvent<HTMLDivElement>) => void
}

/**
 * Paged, full-text search over a single allowed class, with option labels resolved
 * through the field's path formatter.
 */
export const useComboFieldData = (props: UseComboFieldDataProps): UseComboFieldDataReturn => {
  const { formatPath } = useFormatPath()

  // Not useClassDefinitions(): that context is folder scoped inside a listing, so it
  // does not know the related class and the search would never run.
  const { data: classDefinitions } = useClassDefinitionCollectionQuery()

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hits, setHits] = useState<ComboHit[]>([])
  const [totalItems, setTotalItems] = useState<number | undefined>(undefined)
  const [labels, setLabels] = useState<Map<number, string>>(new Map())

  const hitMapRef = useRef<Map<number, ComboHit>>(new Map())

  const classId = useMemo(() => {
    if (props.allowedClasses?.length !== 1) {
      return undefined
    }

    return classDefinitions?.items?.find((item) => item.name === props.allowedClasses?.[0])?.id
  }, [classDefinitions, props.allowedClasses])

  const selected = useMemo(() => {
    const value = props.value

    if (isNil(value) || value.textInput === true) {
      return undefined
    }

    return { id: value.id, fullPath: value.fullPath ?? String(value.id) }
  }, [props.value])

  const { data, isFetching } = useDataObjectGetSearchQuery(
    {
      classId,
      body: {
        columns: SYSTEM_COLUMNS,
        filters: {
          page,
          pageSize: COMBO_PAGE_SIZE,
          includeDescendants: true,
          sortFilter: { key: COLUMN_FULLPATH, direction: 'ASC' },
          columnFilters: searchTerm !== ''
            ? [{ type: FULLTEXT_FILTER_TYPE, filterValue: searchTerm }]
            : []
        }
      }
    },
    { skip: isNil(classId) }
  )

  useEffect(() => {
    if (isNil(data?.items)) {
      return
    }

    const newHits: ComboHit[] = []

    data.items.forEach((item) => {
      const fullPath = item.columns?.find((column) => column.key === COLUMN_FULLPATH)?.value

      if (isNil(item.id) || typeof fullPath !== 'string') {
        return
      }

      const className = item.columns?.find((column) => column.key === COLUMN_CLASSNAME)?.value

      newHits.push({
        id: item.id,
        fullPath,
        className: typeof className === 'string' ? className : 'object'
      })
    })

    newHits.forEach((hit) => { hitMapRef.current.set(hit.id, hit) })

    setHits((previous) => {
      if (page === 1) {
        return newHits
      }

      const known = new Set(previous.map((hit) => hit.id))

      return [...previous, ...newHits.filter((hit) => !known.has(hit.id))]
    })
    setTotalItems(data.totalItems)
  }, [data, page])

  const hasPathFormatter = typeof props.pathFormatterClass === 'string' &&
    props.pathFormatterClass !== '' &&
    typeof props.combinedFieldName === 'string' &&
    props.combinedFieldName !== '' &&
    typeof props.objectId === 'number'

  // Resolves the display names of the loaded hits plus the current value. Only
  // successfully resolved ids are cached, so an in-flight request that never
  // completes cannot leave an id stuck on its object path.
  useEffect(() => {
    if (!hasPathFormatter) {
      return
    }

    const candidates = isNil(selected) ? hits : [...hits, { ...selected, className: 'object' }]
    const missing = candidates.filter((hit) => !labels.has(hit.id))

    if (missing.length === 0) {
      return
    }

    let cancelled = false

    void formatPath(
      missing.map((hit) => ({ id: hit.id, type: 'object', fullPath: hit.fullPath })),
      props.combinedFieldName!,
      props.objectId!,
      false
    ).then((response) => {
      if (cancelled || isNil(response)) {
        return
      }

      const resolved = new Map<number, string>()

      response.items?.forEach((item) => {
        const id = Number(String(item.objectReference).replace('object_', ''))

        if (Number.isInteger(id) && typeof item.formatedPath === 'string' && item.formatedPath !== '') {
          resolved.set(id, item.formatedPath)
        }
      })

      if (resolved.size > 0) {
        setLabels((previous) => new Map([...previous, ...resolved]))
      }
    })

    return () => { cancelled = true }
  }, [hasPathFormatter, hits, selected, labels, props.combinedFieldName, props.objectId])

  const options = useMemo<ComboOption[]>(() => {
    const listed = hits.map((hit) => ({
      value: hit.id,
      label: labels.get(hit.id) ?? hit.fullPath
    }))

    if (isNil(selected) || listed.some((option) => option.value === selected.id)) {
      return listed
    }

    // Keep the current value renderable while a search filters it out.
    return [{ value: selected.id, label: labels.get(selected.id) ?? selected.fullPath }, ...listed]
  }, [hits, labels, selected])

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setPage(1)
      setSearchTerm(value)
    }, SEARCH_DEBOUNCE_MS),
    []
  )

  // Always search server side: filtering the options locally would only match the
  // rendered labels, which fall back to object paths whenever no path formatter
  // applies — typing a name would then find nothing.
  const handleSearch = useCallback((value: string): void => {
    if (value === '') {
      debouncedSetSearch.cancel()
      setPage(1)
      setSearchTerm('')

      return
    }

    debouncedSetSearch(value)
  }, [debouncedSetSearch])

  const handleDropdownVisibleChange = useCallback((open: boolean): void => {
    setIsOpen(open)

    if (!open) {
      debouncedSetSearch.cancel()
      setSearchTerm('')
      setPage(1)
    }
  }, [debouncedSetSearch])

  const handlePopupScroll = useCallback((event: React.UIEvent<HTMLDivElement>): void => {
    const element = event.currentTarget
    const hasMore = !isNil(totalItems) && hits.length < totalItems

    if (element.scrollHeight - element.scrollTop - element.clientHeight < 100 && !isFetching && hasMore) {
      setPage((previous) => previous + 1)
    }
  }, [totalItems, hits.length, isFetching])

  return {
    options,
    isFetching: isFetching && isOpen,
    hitById: (id: number) => hitMapRef.current.get(id),
    handleSearch,
    handleDropdownVisibleChange,
    handlePopupScroll
  }
}
