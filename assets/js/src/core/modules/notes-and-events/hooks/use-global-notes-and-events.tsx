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

import { useState } from 'react'
import {
  type Note,
  useNoteGetCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'

export type DataNote = Note & {
  rowId: string
}

interface UseGlobalNotesAndEventsReturn {
  notesAndEvents: Note[]
  notesAndEventsLoading: boolean
}

export const useNotesAndEvents = (): UseGlobalNotesAndEventsReturn => {
  const [filter, setFilter] = useState<string>('')

  setFilter('')

  const { data: notesAndEvents, isLoading } = useNoteGetCollectionQuery({
    body: {
      page: 1,
      pageSize: 9999,
      filter
    }
  })

  return {
    notesAndEvents: notesAndEvents?.items ?? [],
    notesAndEventsLoading: isLoading
  }
}
