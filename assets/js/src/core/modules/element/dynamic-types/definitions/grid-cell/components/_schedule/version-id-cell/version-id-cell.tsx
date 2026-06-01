/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { useVersionGetCollectionForElementByTypeAndIdQuery, type Version } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice-enhanced'
import { type SelectProps } from 'rc-select/lib/Select'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { SelectCell, type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'
import { useStyles } from './version-id-cell.styles'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import trackError from '@Pimcore/modules/app/error-handler'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'

export const VersionIdCell = (props: DefaultCellProps): React.JSX.Element => {
  const { id, elementType } = useElementContext()
  const { data, isLoading, isError, error } = useVersionGetCollectionForElementByTypeAndIdQuery({
    elementType,
    id,
    page: 1,
    pageSize: 9999
  })

  if (isError) {
    trackError(new ApiError(error))
  }

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
          <div className={ 'version-id__selection-item-hidden' }>{formatDateTime({ timestamp: value.date, dateStyle: 'short', timeStyle: 'short' })}</div>
        </div>
      )
    }
  })

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
