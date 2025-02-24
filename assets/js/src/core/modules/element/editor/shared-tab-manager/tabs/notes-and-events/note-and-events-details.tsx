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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import type {
  Note
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { isNull, isUndefined } from 'lodash'
import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { Flex } from '@Pimcore/components/flex/flex'
import { Tag } from '@Pimcore/components/tag/tag'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { Breadcrumb } from '@Pimcore/components/breadcrumb/breadcrumb'
import { useStyle } from './notes-and-events-details.styles'

interface NoteAndEventDetailsProps {
  note: Note
}

interface NoteDataEntry {
  name: string | null
  type: string | null
  value?: string | React.JSX.Element | null
}

export const NoteAndEventDetails = ({ note }: NoteAndEventDetailsProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyle()
  const { mapToElementType, openElement } = useElementHelper()
  const formatedData: NoteDataEntry[] = []
  const transformData = (noteData: any): void => {
    if (typeof noteData !== 'object' || !('data' in noteData)) {
      return
    }
    const tempData: NoteDataEntry = {
      name: (noteData as NoteDataEntry).name,
      type: (noteData as NoteDataEntry).type,
      value: noteData.data
    }
    formatedData.push(tempData)
  }

  note.data.forEach((noteData) => {
    transformData(noteData)
  })

  const formatValueFieldBasedOnType = (value: any, type: string): string | React.JSX.Element | undefined => {
    switch (type) {
      case 'asset':
      case 'document':
      case 'object':
        if ('path' in value) {
          const { path, id } = value
          const eType = mapToElementType(type)

          return !isUndefined(eType)
            ? (
              <Tag
                bordered={ false }
                color="blue"
                onClick={ async () => {
                  await openElement({ id: Number(id), type: eType })
                } }
              >
                <Breadcrumb
                  editorTabsWidth={ 1500 }
                  elementType={ eType }
                  pageSize={ 'L' }
                  path={ String(path) }
                />
              </Tag>
              )
            : <></>
        }
        return JSON.stringify(value)
      case 'date':
        return <FormattedDate timestamp={ value } />
      default:
        if (typeof value === 'string') return respectLineBreak(value, false)
        else return JSON.stringify(value)
    }
  }

  const columnHelper = createColumnHelper<NoteDataEntry>()

  const createColumns = (): any => [
    columnHelper.accessor('name', { header: t('notes-and-events.name') }),
    columnHelper.accessor('type', { header: t('notes-and-events.type'), size: 120 }),
    columnHelper.accessor(row => ({ value: row.value, type: row.type }), {
      header: t('notes-and-events.value'),
      size: 310,
      cell: (info) => {
        const { value, type } = info.getValue()
        const displayValue = !isNull(type) && formatValueFieldBasedOnType(value, type)
        return (
          <Flex
            align={ 'center' }
            className={ styles.valueCell }
          >
            {displayValue}
          </Flex>
        )
      }
    })
  ]

  const tableData = createColumns()

  return (
    <div>
      <span className={ 'panel-body__details' }>{t('notes-and-events.details')}</span>
      <Grid
        autoWidth
        columns={ tableData }
        data={ formatedData }
        resizable
      />
    </div>
  )
}
