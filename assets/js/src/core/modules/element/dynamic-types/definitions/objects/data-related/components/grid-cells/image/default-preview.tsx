/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
import React from 'react'

export const DefaultPreview = (): React.JSX.Element => {
  return (
    <Box
      className="w-full h-full"
      padding={ 'mini' }
    >
      <Flex
        align='center'
        className="w-full h-full"
        gap={ 'mini' }
        justify='space-between'
      >
        <Text
          italic
          type='secondary'
        >
          No preview available
        </Text>

        <IconButton
          icon={ { value: 'edit' } }
          variant='minimal'
        />
      </Flex>
    </Box>
  )
}
