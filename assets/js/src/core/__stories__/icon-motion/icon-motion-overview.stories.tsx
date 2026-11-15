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
import { type Meta } from '@storybook/react'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'

const config: Meta = {
  title: 'Tools/IconMotion',
  parameters: {
    layout: 'centered'
  }
}

export default config

const icons = [
  { value: 'trash', label: 'Delete', hint: 'hover: turns into the error color and the lid lifts, press: it closes' },
  { value: 'refresh', label: 'Refresh', hint: 'hover: turns slightly, click: one full turn' }
]

const IconMotionOverview = (): React.JSX.Element => (
  <Flex
    gap='large'
    vertical
  >
    {icons.map(({ value, label, hint }) => (
      <Flex
        align='center'
        gap='small'
        key={ value }
      >
        <IconTextButton icon={ { value } }>{label}</IconTextButton>
        <IconButton
          icon={ { value } }
          title={ label }
        />
        <Text type='secondary'>{hint}</Text>
      </Flex>
    ))}

  </Flex>
)

export const _default = {
  render: () => <IconMotionOverview />
}
