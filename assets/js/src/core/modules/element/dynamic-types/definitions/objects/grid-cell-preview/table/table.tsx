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
import { isArray, isEmpty, isNil } from 'lodash'
import { useStyles } from './table.styles'

import { type TableValue } from '../../data-related/components/table/hooks/use-table-value'
import classNames from 'classnames'

interface TableProps {
  value: TableValue | null
}

export const Table = ({ value }: TableProps): React.JSX.Element => {
  const { styles } = useStyles()

  if (isNil(value) || isEmpty(value)) {
    return <></>
  }

  return (
    <GridCellPreviewWrapper>
      <table className={ classNames(styles.table, styles.tableNoMinWidth) }>
        {value.map((row, rowIndex) => (
          <tr key={ rowIndex }>
            {isArray(row) && row.map((cell, cellIndex) => (
              <td key={ cellIndex }>{cell}</td>
            ))}
          </tr>
        ))}
      </table>
    </GridCellPreviewWrapper>
  )
}
