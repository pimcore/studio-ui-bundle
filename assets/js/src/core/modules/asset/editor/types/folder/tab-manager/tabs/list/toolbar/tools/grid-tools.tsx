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
import React from 'react'
import { GridSelections } from './grid-selections'
import { GridActions } from './grid-actions'
import { useListData } from '../../hooks/use-list'

export const GridTools = (): React.JSX.Element => {
  const { data } = useListData()

  return (
    <>
      { data !== undefined && (
        <ButtonGroup
          items={ [
            <GridSelections key={ 'grid-selections' } />,
            <GridActions key={ 'grid-actions' } />
          ] }
          withSeparator
        />
      )}

      { data === undefined && (
        <div />
      )}
    </>
  )
}
