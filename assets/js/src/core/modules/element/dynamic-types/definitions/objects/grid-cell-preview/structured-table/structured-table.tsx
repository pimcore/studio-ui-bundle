/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { GridCellPreviewWrapper } from '../grid-cell-cell-preview-wrapper/grid-cell-preview-wrapper'
import { isEmpty, isNil } from 'lodash'
import { useStyles } from '../table/table.styles'

import { type StructuredTableCol, type StructuredTableRow, type StructuredTableValue } from '../../data-related/components/structured-table/structured-table'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface StructuredTableProps {
  value: StructuredTableValue | null
  rows: StructuredTableRow[]
  cols: StructuredTableCol[]
}

export const StructuredTable = ({ value, rows, cols }: StructuredTableProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  if (isNil(value) || isEmpty(value)) {
    return <></>
  }

  return (
    <GridCellPreviewWrapper>
      <table
        className={ classNames(styles.table, styles.tableNoMinWidth) }
      >
        <thead>
          <tr>
            <th></th>
            {cols.map((col, colIndex) => (
              <th key={ colIndex }>{t(col.label)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={ rowIndex }>
              <th>{t(row.label)}</th>
              {cols.map((col, colIndex) => (
                <td key={ colIndex }>{value[row.key]?.[col.key] ?? ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </GridCellPreviewWrapper>
  )
}
