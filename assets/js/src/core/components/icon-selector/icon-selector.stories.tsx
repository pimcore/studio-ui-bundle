/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react'
import { IconSelector } from './icon-selector'
import React, { useState } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'

const config: Meta = {
  title: 'Components/General/IconSelector',
  component: IconSelector,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

type Story = StoryObj<typeof config>

const IconSelectorDemo = (): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<ElementIcon | undefined>(undefined)

  const handleOpen = (): void => {
    setOpen(true)
  }

  const handleClose = (): void => {
    setOpen(false)
  }

  const handleSelect = (icon: ElementIcon): void => {
    setSelectedIcon(icon)
    setOpen(false)
  }

  return (
    <div style={ { padding: '20px' } }>
      <div style={ { marginBottom: '20px' } }>
        <p>Current selected icon: <strong>{selectedIcon}</strong></p>
        <IconButton
          icon={ { value: selectedIcon } }
          onClick={ handleOpen }
        >
          Select Icon
        </IconButton>
      </div>

      <IconSelector
        onCancel={ handleClose }
        onSelect={ handleSelect }
        open={ open }
        selectedIcon={ selectedIcon }
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <IconSelectorDemo />
}
