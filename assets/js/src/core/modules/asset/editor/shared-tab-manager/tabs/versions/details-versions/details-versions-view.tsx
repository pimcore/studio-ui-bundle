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

import React, { useState } from 'react'
import i18n from '@Pimcore/app/i18n'
import { useStyles } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions/details-versions/details-versions-view.style'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { DefaultCell } from '@Pimcore/components/grid/columns/default-cell'

interface DetailsVersionsViewProps {
  versionIds: number[]
  data: any[]
}

export const DetailsVersionsView = ({
  versionIds,
  data
}: DetailsVersionsViewProps): React.JSX.Element => {
  const { styles } = useStyles()
  const [comparedImages, setComparedImages] = useState({})

  const columnHelper = createColumnHelper<any>()
  const versionColumns: any[] = []
  versionIds.forEach((id: number) => {
    versionColumns.push(columnHelper.accessor(i18n.t('version.version') + ' ' + id, {
      cell: info => {
        const cellsInRow = info.row.getAllCells()
        if (cellsInRow.length === 3 && info.cell.id === cellsInRow[2].id) {
          const cellValue = info.cell.getValue()
          if (cellValue instanceof Object && cellValue.key === 'image') {
            const firstCellValue = cellsInRow[1].getValue() as React.JSX.Element
            if (cellValue.props.src !== undefined && firstCellValue.props.src !== undefined) {
              const src1 = cellValue.props.src.toString() as string
              const src2 = firstCellValue.props.src.toString() as string
              const key = `${src1}-${src2}`
              if (Object.keys(comparedImages).includes(key)) {
                if (comparedImages[key] as boolean) {
                  return <b className={ 'highlight-cell' }><DefaultCell { ...info } /></b>
                }
              } else {
                compareImages(src1, src2)
                  .then((result) => {
                    setComparedImages({ ...comparedImages, [key]: result })
                  })
                  .catch((error) => {
                    console.error(error)
                  })
              }
            }
          } else if (cellValue !== cellsInRow[1].getValue()) {
            return <b className={ 'highlight-cell' }><DefaultCell { ...info } /></b>
          }
        }
        return <DefaultCell { ...info } />
      }
    }))
  })

  const columns = [
    columnHelper.accessor(i18n.t('field'), {}),
    ...versionColumns
  ]

  async function compareImages (src1: string, src2: string): Promise<boolean> {
    const key = `${src1}-${src2}`
    if (Object.keys(comparedImages).includes(key)) {
      return comparedImages[key]
    }

    const img1 = new Image()
    img1.src = src1
    const img2 = new Image()
    img2.src = src2

    await new Promise((resolve) => {
      img1.onload = resolve
    })
    await new Promise((resolve) => {
      img2.onload = resolve
    })

    const img1Base64 = getImageInBase64(img1)
    const img2Base64 = getImageInBase64(img2)
    return img1Base64 === img2Base64
  }

  const getImageInBase64 = (img: HTMLImageElement): string => {
    const canvasElement = document.createElement('canvas')
    canvasElement.width = img.width
    canvasElement.height = img.height
    const ctx = canvasElement.getContext('2d')
    ctx!.drawImage(img, 0, 0)
    return canvasElement.toDataURL('image/png')
  }

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
