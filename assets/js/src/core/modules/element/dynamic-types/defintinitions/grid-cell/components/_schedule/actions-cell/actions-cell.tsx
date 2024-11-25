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

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React from 'react'
import { SelectCell, type SelectCellConfig } from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/components/select/select-cell'
import { useTranslation } from 'react-i18next'
import { addColumnConfig } from '@Pimcore/components/grid/columns/helpers'

export const ActionsCell = (props: DefaultCellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const selectOptions = [
    {
      value: 'delete',
      label: t('schedule.version.delete')
    },
    {
      value: 'publish',
      label: t('schedule.version.publish')
    }
  ]

  const columnConfig: SelectCellConfig = {
    options: selectOptions
  }

  return (
    <SelectCell { ...addColumnConfig(props, columnConfig) } />
  )
}
