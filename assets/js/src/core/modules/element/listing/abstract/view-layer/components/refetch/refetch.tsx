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

import React from 'react'
import { useData } from '../../../data-layer/provider/data/use-data'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Spin } from '@Pimcore/components/spin/spin'
import { Box } from '@Pimcore/components/box/box'

export const Refetch = (): React.JSX.Element => {
  const { dataQueryResult } = useData()

  if (dataQueryResult === undefined) {
    return <></>
  }

  const { isFetching, refetch } = dataQueryResult

  if (isFetching) {
    return (
      <Box padding={ { x: 'small' } }>
        <Spin />
      </Box>
    )
  }

  return (
    <IconButton
      icon={ { value: 'refresh' } }
      onClick={ async () => await refetch() }
    />
  )
}
