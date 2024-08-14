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

import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Checkbox } from 'antd'
import React from 'react'
import { useListSelectedRows } from '../../hooks/use-list'

export const GridTools = (): React.JSX.Element => {
  const { selectedRows } = useListSelectedRows()

  return (
    <ButtonGroup
      items={ [
        <Checkbox key={ 'checkbox' }>{Object.keys(selectedRows).length} selected</Checkbox>,
        <DropdownButton key={ 'dropdown-button' }>Apply to selection</DropdownButton>
      ] }
      withSeparator
    />
  )
}
