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
import type { Meta } from '@storybook/react'
import { GridButton } from './grid-button'

const config: Meta = {
  title: 'Components/Controls/Buttons/GridButton',
  component: GridButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const InGrid = {
  render: () => (
    <div style={ { display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: '16px' } }>
      <GridButton
        icon={ { value: 'plus-circle' } }
        label="Add"
        onClick={ () => { console.log('Add clicked') } }
      />
      <GridButton
        icon={ { value: 'edit' } }
        label="Edit"
        onClick={ () => { console.log('Edit clicked') } }
      />
      <GridButton
        icon={ { value: 'trash' } }
        label="Delete"
        onClick={ () => { console.log('Delete clicked') } }
      />
      <GridButton
        icon={ { value: 'settings' } }
        label="Settings"
        onClick={ () => { console.log('Settings clicked') } }
      />
      <GridButton
        icon={ { value: 'download' } }
        label="Download"
        onClick={ () => { console.log('Download clicked') } }
      />
      <GridButton
        icon={ { value: 'upload-cloud' } }
        label="Upload"
        onClick={ () => { console.log('Upload clicked') } }
      />
    </div>
  )
}
