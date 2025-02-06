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

import { Content } from '@Pimcore/components/content/content'
import React from 'react'
import { useRowSelection } from '../../../../../context-layer/provider/use-row-selection'
import { Title } from '@Pimcore/components/title/title'
import { SelectionGrid } from './selection-grid'

export const SelectionOverview = (): React.JSX.Element => {
  const { selectedRows } = useRowSelection()

  return (
    <Content padded>
      <Title>Selected Elements</Title>

      {selectedRows === undefined && (
        <div>No elements selected</div>
      )}

      {selectedRows !== undefined && (
        <SelectionGrid />
      )}
    </Content>
  )
}
