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
