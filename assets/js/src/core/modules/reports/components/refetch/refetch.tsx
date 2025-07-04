/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Spin } from '@Pimcore/components/spin/spin'
import { Box } from '@Pimcore/components/box/box'

interface RefetchProps {
  isFetching: boolean
  refetch: () => void
}

export const Refetch = ({ isFetching, refetch }: RefetchProps): React.JSX.Element => {
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
      onClick={ async () => { refetch() } }
    />
  )
}
