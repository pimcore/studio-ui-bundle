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
import { SelectCell } from '@Pimcore/components/grid/columns/types/select/select-cell'
import { useTranslation } from 'react-i18next'

export const ActionsCell = (props: DefaultCellProps): React.JSX.Element => {
  const { t } = useTranslation()
  const selectOptions = [
    {
      value: 'delete',
      label: t('asset.asset-editor-tabs.schedule.version.delete')
    },
    {
      value: 'publish',
      label: t('asset.asset-editor-tabs.schedule.version.publish')
    }
  ]

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
            options: selectOptions
          }
        }
      }
    }
  }

  return (
    <SelectCell { ...modifiedProps } />
  )
}
