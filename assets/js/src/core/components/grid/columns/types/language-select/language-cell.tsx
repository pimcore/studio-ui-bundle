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
import {
  useGetSystemSettingsQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/settings-slice.gen'

export const LanguageCell = (props: DefaultCellProps): React.JSX.Element => {
  const { data, isLoading } = useGetSystemSettingsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  const modifiedProps = {
    ...props,
    row: {
      ...props.row,
      original: {
        ...props.row.original,
        config: data?.requiredLanguages.join(',')
      }
    }
  }

  return (
    <SelectCell { ...modifiedProps } />
  )
}
