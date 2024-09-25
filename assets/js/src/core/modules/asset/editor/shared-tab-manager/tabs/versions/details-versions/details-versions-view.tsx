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
import {
  type PreviewFieldLabelCellValue
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/table/cells/preview-field-label-cell/preview-field-label-cell'
import { type AssetVersionData } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-functions'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { Flex, Space } from 'antd'

interface DetailsVersionsViewProps {
  versions: AssetVersionData[]
  gridData: any[]
}

export const DetailsVersionsView = ({
  versions,
  gridData
}: DetailsVersionsViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  const columnHelper = createColumnHelper<any>()
  const versionColumns: any[] = []
  versions.forEach((version) => {
    versionColumns.push(columnHelper.accessor(i18n.t('version.version') + ' ' + version.versionCount, {
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

      <Space
        direction="vertical"
        size="large"
        style={ { maxWidth: versions.length > 1 ? 1200 : 600 } }
      >
        <Flex
          align="center"
          gap="small"
          justify="center"
          style={ { minHeight: 100 } }
        >
          {versions.map((version, index) => {
            return (
              <div key={ index }>
                { version.previewImageUrl !== null
                  ? (
                    <PimcoreImage
                      src={ version.previewImageUrl }
                      style={ { maxHeight: 500, maxWidth: 500 } }
                    />
                    )
                  : 'No preview available' }

              </div>
            )
          })}
        </Flex>

        <Flex
          align="center"
          className='w-full'
        >
          <Grid
            autoWidth
            columns={ columns }
            data={ gridData }
          />
        </Flex>
      </Space>
    </div>
  )
}
