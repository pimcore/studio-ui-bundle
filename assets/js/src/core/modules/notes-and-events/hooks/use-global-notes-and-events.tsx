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

import { useMemo, useState } from 'react'
import {
  type Note,
  useNoteGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'

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
  setFilter: (filter: string) => void
}

export const useNotesAndEvents = (): UseGlobalNotesAndEventsReturn => {
  const [filter, setFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(20)

  const queryArgs = useMemo(() => ({ body: { page, pageSize, filter } }), [page, pageSize, filter])

  const { data: notesAndEvents, isLoading, isFetching } = useNoteGetCollectionQuery(queryArgs)

  return {
    totalItems: notesAndEvents?.totalItems ?? 0,
    notesAndEvents: notesAndEvents?.items ?? [],
    isLoading,
    isFetching,
    page,
    setPage,
    pageSize,
    setPageSize,
    setFilter
  }
}
