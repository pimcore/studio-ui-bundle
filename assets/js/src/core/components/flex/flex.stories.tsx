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

import { type Meta } from '@storybook/react'
import { Flex } from './flex'
import React from 'react'
import { Button } from '../button/button'
import { Text } from '../text/text'

const config: Meta = {
  title: 'Components/Layout/Spacing/Flex',
  component: Flex,
  tags: ['autodocs']
}

export default config

const children = (
  <>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </>
)

export const _default = {
  args: {
    children: children,
  }
}

export const Nesting = {
  args: {
    children: (
      <>
        <Flex align='center' gap={'extra-small'}>
          <Text>
            Text 1
          </Text>

          <Button>
            Button 1
          </Button>
        </Flex>

        <Flex align='center' gap={'extra-small'}>
          <Text>
            Text 2
          </Text>

          <Button>
            Button 2
          </Button>
        </Flex>
      </>
    ),

    justify: 'space-between',

    gap: 'large'
  }
}

export const Mini = {
  args: {
    children: children,
    gap: 'mini'
  }
}

export const ExtraSmall = {
  args: {
    children: children,
    gap: 'extra-small'
  }
}

export const Small = {
  args: {
    children: children,
    gap: 'small'
  }
}

export const Normal = {
  args: {
    children: children,
    gap: 'normal'
  }
}

export const Medium = {
  args: {
    children: children,
    gap: 'medium'
  }
}

export const Large = {
  args: {
    children: children,
    gap: 'large'
  }
}

export const ExtraLarge = {
  args: {
    children: children,
    gap: 'extra-large'
  }
}

export const Maxi = {
  args: {
    children: children,
    gap: 'maxi'
  }
}

export const CustomGap = {
  args: {
    children: children,
    gap: 5
  }
}

export const vertical = {
  args: {
    children: children,
    vertical: true,
    gap: 'large'
  }
}
