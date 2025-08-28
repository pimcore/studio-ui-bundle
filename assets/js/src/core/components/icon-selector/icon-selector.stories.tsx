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

const config: Meta = {
  title: 'Components/General/IconSelector',
  component: IconSelector,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean'
    },
    selectedIcon: {
      control: 'text'
    }
  }
}

export default config

type Story = StoryObj<typeof config>

const IconSelectorWithTrigger = (): React.JSX.Element => {
  const [open, setOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string>('folder')

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <p>Current selected icon: <strong>{selectedIcon ?? 'None'}</strong></p>
        <IconButton
          icon={{ value: selectedIcon ?? 'questionmark' }}
          onClick={() => setOpen(true)}
        >
          Select Icon
        </IconButton>
      </div>
      
      <IconSelector
        onCancel={() => setOpen(false)}
        onSelect={(iconName) => {
          setSelectedIcon(iconName)
          setOpen(false)
        }}
        open={open}
        selectedIcon={selectedIcon}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <IconSelectorWithTrigger />
}

export const WithNoSelection: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState<string | undefined>(undefined)

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <p>Current selected icon: <strong>{selectedIcon ?? 'None'}</strong></p>
          <IconButton
            icon={{ value: selectedIcon ?? 'questionmark' }}
            onClick={() => setOpen(true)}
          >
            Select Icon
          </IconButton>
        </div>
        
        <IconSelector
          onCancel={() => setOpen(false)}
          onSelect={(iconName) => {
            setSelectedIcon(iconName)
            setOpen(false)
          }}
          open={open}
          selectedIcon={selectedIcon}
        />
      </div>
    )
  }
}

export const OpenModal: Story = {
  args: {
    open: true,
    selectedIcon: 'pimcore',
    onCancel: () => {},
    onSelect: () => {}
  }
}
