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
import React from 'react'
import { useVersionGetCollectionForElementByTypeAndIdQuery, type Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import i18n from 'i18next'
import { type SelectProps } from 'rc-select/lib/Select'
import { SelectCell, type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/components/select/select-cell'
import { useStyles } from './version-id-cell.styles'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export const VersionIdCell = (props: DefaultCellProps): React.JSX.Element => {
  const { id, elementType } = useElementContext()
  const { data, isLoading } = useVersionGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id,
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

  const columnConfig: SelectCellConfig = {
    options: formattedSelectOptions
  }

  return (
    <div className={ styles.select } >
      <SelectCell { ...addColumnConfig(props, columnConfig) } />
    </div>
  )
}
