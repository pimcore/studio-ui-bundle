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
import {useTranslation} from 'react-i18next'
import i18n from 'i18next'
import {Grid} from '@Pimcore/components/grid/grid'
import {createColumnHelper} from '@tanstack/react-table'

interface NoteAndEventDetailsProps {
  showDetails: boolean
}

export const NoteAndEventDetails = ({showDetails
}: NoteAndEventDetailsProps): React.JSX.Element => {
  const { t } = useTranslation()

  interface NoteDataEntry { name: string | null, type: string | null, value?: string | React.JSX.Element | null }
  const formatedData: NoteDataEntry[] = []

    const columnHelper = createColumnHelper<any>()

    const columns = [
      columnHelper.accessor('name', { header: i18n.t('notes-and-events.name') }),
      columnHelper.accessor('type', { header: i18n.t('notes-and-events.type'), size: 120 }),
      columnHelper.accessor('value', { header: i18n.t('notes-and-events.value'), size: 310, meta: { autoWidth: true } })
    ]

      return (<>
          {showDetails && (
          <div>
            <span className={ 'panel-body__details' }>{i18n.t('notes-and-events.details')}</span>
            <Grid
              autoWidth
              columns={ columns }
              data={ formatedData }
              resizable
            />
          </div>
          )}
        </>
      )
}
