/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useState } from 'react'
import {
  type Note,
  useNoteGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { useFilterQuery } from '@Pimcore/components/filters'
import {
  notesFilterAdapter,
  useNotesAppliedFilters
} from '@Pimcore/modules/notes-and-events/filters/notes-filters'

export type DataNote = Note & {
  rowId: string
  fields: number
}

interface UseGlobalNotesAndEventsReturn {
  totalItems: number
  notesAndEvents: Note[]
  isLoading: boolean
  isFetching: boolean
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export const useNotesAndEvents = (): UseGlobalNotesAndEventsReturn => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(20)

  const { values: appliedValues } = useNotesAppliedFilters()
  const buildFilterQuery = useFilterQuery(notesFilterAdapter, appliedValues)

  // Reset to the first page whenever the applied filters change.
  useEffect(() => {
    setPage(1)
  }, [appliedValues])

  const { filter, fieldFilters } = buildFilterQuery({})

  // RTK Query keys its cache by the serialized args, so building a fresh object each
  // render is safe and avoids depending on the per-render buildFilterQuery closure.
  // `fieldFilters` is a JSON string the backend json_decodes; the generated body type
  // mislabels it as `object`, hence the cast.
  const queryArgs = {
    body: {
      page,
      pageSize,
      filter,
      fieldFilters: fieldFilters as unknown as object
    }
  }

  const { data: notesAndEvents, isLoading, isFetching } = useNoteGetCollectionQuery(queryArgs)

  return {
    totalItems: notesAndEvents?.totalItems ?? 0,
    notesAndEvents: notesAndEvents?.items ?? [],
    isLoading,
    isFetching,
    page,
    setPage,
    pageSize,
    setPageSize
  }
}
