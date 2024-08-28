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

import React, { type MouseEvent } from 'react'
import { useListData, useListSelectedRows } from '../../hooks/use-list'
import { Checkbox } from 'antd'

export const GridSelections = (): React.JSX.Element => {
  const { selectedRows, setSelectedRows } = useListSelectedRows()
  const selectedRowsCount = Object.keys(selectedRows).length
  const { data } = useListData()

  const hasSelectedRows = selectedRowsCount > 0
  let isAllDataSelected = false

  if (data !== undefined) {
    isAllDataSelected = selectedRowsCount === data.items.length && data.items.length > 0
  }

  return (
    <Checkbox
      checked={ isAllDataSelected }
      indeterminate={ hasSelectedRows && !isAllDataSelected }
      onClick={ onClick }
    >
      {selectedRowsCount} selected
    </Checkbox>
  )

  function onClick (e: MouseEvent<HTMLElement>): void {
    e.stopPropagation()

    if (data === undefined) {
      return
    }

    if (isAllDataSelected) {
      setSelectedRows({})
      return
    }

    const newSelectedRows: Record<string, boolean> = {}

    data.items.forEach(item => {
      const idColumn = item.columns?.find(column => column.key === 'id')

      newSelectedRows[idColumn?.value] = true
    })

    setSelectedRows(newSelectedRows)
  }
}
