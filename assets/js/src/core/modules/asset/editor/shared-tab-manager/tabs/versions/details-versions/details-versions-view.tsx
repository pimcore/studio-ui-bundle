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
import i18n from '@Pimcore/app/i18n'
import { useStyles } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-view.style'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { DefaultCell } from '@Pimcore/components/grid/columns/default-cell'
import { type VersionIdentifiers } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/versions-view'
import {
  type PreviewFieldLabelCellValue
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/table/cells/preview-field-label-cell/preview-field-label-cell'

interface DetailsVersionsViewProps {
  versionIds: VersionIdentifiers[]
  data: any[]
}

export const DetailsVersionsView = ({
  versionIds,
  data
}: DetailsVersionsViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  const columnHelper = createColumnHelper<any>()
  const versionColumns: any[] = []
  versionIds.forEach((vId: VersionIdentifiers) => {
    versionColumns.push(columnHelper.accessor(i18n.t('version.version') + ' ' + vId.count, {
      cell: info => {
        const cellsInRow = info.row.getAllCells()
        if (cellsInRow.length === 3 && info.cell.id === cellsInRow[2].id) {
          const cellValue = info.cell.getValue()
          const labelCellValue = cellsInRow[0].getValue()

          if (!(typeof labelCellValue === 'object' && (labelCellValue as PreviewFieldLabelCellValue).key === 'version-preview') &&
            JSON.stringify(cellValue) !== JSON.stringify(cellsInRow[1].getValue())) {
            return <span className={ 'highlight-cell' }><DefaultCell { ...info } /></span>
          }
        }
        return <DefaultCell { ...info } />
      }
    }))
  })

  const columns = [
    columnHelper.accessor(i18n.t('field'), { meta: { type: 'version-preview-field-label' } }),
    ...versionColumns
  ]

  return (
    <div className={ styles['right-side'] }>
      <Grid
        columns={ columns }
        data={ data }
        resizable
      />
    </div>
  )
}
