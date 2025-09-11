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
  const [selectedIcon, setSelectedIcon] = useState<ElementIcon | undefined>(undefined)

  const handleChange = (icon: ElementIcon | undefined): void => {
    setSelectedIcon(icon)
  }

  return (
    <div style={ { padding: '20px' } }>
      <div style={ { marginBottom: '20px' } }>
        <p>Current selected icon: <strong>{selectedIcon?.value ?? 'None'}</strong></p>

        <IconSelector
          onChange={ handleChange }
          value={ selectedIcon }
        >
          {(openModal) => (
            <IconButton
              icon={ { value: selectedIcon?.value ?? 'edit' } }
              onClick={ openModal }
            >
              Select Icon
            </IconButton>
          )}
        </IconSelector>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <IconSelectorDemo />
}
