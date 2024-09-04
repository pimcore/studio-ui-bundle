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

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React, { useContext } from 'react'
import { useGetVersionsQuery, type Version } from '@Pimcore/modules/element/editor/version-api-slice.gen'
import i18n from 'i18next'
import { type SelectProps } from 'rc-select/lib/Select'
import { SelectCell } from '@Pimcore/components/grid/columns/types/select/select-cell'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { useStyles } from './version-id-cell.styles'

export const VersionIdCell = (props: DefaultCellProps): React.JSX.Element => {
  const { id } = useContext(AssetContext)
  const { data, isLoading } = useGetVersionsQuery({
    elementType: 'asset',
    id: id!,
    page: 1,
    pageSize: 9999
  })
  let selectOptions: Version[] = []
  if (!isLoading && data !== undefined) {
    selectOptions = data.items
  }
  const formattedSelectOptions: SelectProps['options'] = selectOptions.map((value: Version) => {
    return {
      value: value.id,
      displayValue: value.versionCount,
      label: (
        <div className={ 'version-id__select__label' }>
          <div>
            <b>{value.versionCount}</b>
            <span className={ 'version-id__selection-item-hidden' }> | {value.user.name ?? 'not found'}</span>
          </div>
          <div className={ 'version-id__selection-item-hidden' }>{formatDate(value.date)}</div>
        </div>
      )
    }
  })

  function formatDate (timestamp: number): string {
    return i18n.format(
      new Date(timestamp * 1000),
      'datetime',
      i18n.language,
      {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    )
  }
  const { styles } = useStyles()

  const modifiedProps = {
    ...props,
    column: {
      ...props.column,
      columnDef: {
        ...props.column.columnDef,
        meta: {
          ...props.column.columnDef.meta,
          config: {
            ...props.column.columnDef?.meta?.config,
            options: formattedSelectOptions
          }
        }
      }
    }
  }

  return (
    <div className={ styles.select } >
      <SelectCell { ...modifiedProps } />
    </div>
  )
}
