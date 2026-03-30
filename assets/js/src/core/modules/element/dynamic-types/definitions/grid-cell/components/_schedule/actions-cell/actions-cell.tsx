/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { SelectCell, type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/definitions/grid-cell/components/select/select-cell'
import { useTranslation } from 'react-i18next'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useScheduleListActionsForElementTypeQuery } from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice-enhanced'
import trackError from '@Pimcore/modules/app/error-handler'
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'

export const ActionsCell = (props: DefaultCellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { elementType } = useElementContext()
  const { data, isLoading, isError, error } = useScheduleListActionsForElementTypeQuery({ elementType })

  if (isError) {
    trackError(new ApiError(error))
  }

  const selectOptions = (!isLoading && data !== undefined)
    ? data.items.map((action) => ({
        value: action.key,
        label: t(`schedule.action.${action.key}`)
      }))
    : []

  const columnConfig: SelectCellConfig = {
    options: selectOptions
  }

  return (
    <SelectCell { ...addColumnConfig(props, columnConfig) } />
  )
}
