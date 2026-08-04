/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '@Pimcore/components/button/button'
import { ColumnPicker } from './column-picker'
import { ColumnPickerPopover } from './column-picker-popover'
import { type ColumnPickerGroup } from './column-picker.types'

const groups: ColumnPickerGroup[] = [
  {
    key: 'data-quality',
    label: 'Data Quality',
    items: [
      { key: 'texts-available', label: 'Texts Available' },
      { key: 'images-available', label: 'Images Available' },
      { key: 'attributes-available', label: 'Attributes Available' },
      { key: 'sale-information-available', label: 'Sale Information Available' }
    ]
  },
  {
    key: 'system',
    label: 'System',
    items: [
      { key: 'id', label: 'ID' },
      { key: 'fullpath', label: 'Full path' },
      { key: 'key', label: 'Key' },
      { key: 'published', label: 'Published' },
      { key: 'creationDate', label: 'Creation date' },
      { key: 'modificationDate', label: 'Modification date' },
      { key: 'filename', label: 'Filename' },
      { key: 'classname', label: 'Classname' }
    ]
  },
  {
    key: 'basedata',
    label: 'Basedata',
    items: [{ key: 'title', label: 'Title' }],
    children: [
      {
        key: 'media',
        label: 'Media',
        items: [{ key: 'image', label: 'Image' }]
      }
    ]
  }
]

const config: Meta<typeof ColumnPicker> = {
  title: 'Components/Data Entry/ColumnPicker',
  component: ColumnPicker,
  tags: ['autodocs']
}

export const _default: StoryObj<typeof ColumnPicker> = {
  args: {
    groups,
    onSelect: (item) => { console.log('selected', item) }
  }
}

export const WithoutSearch: StoryObj<typeof ColumnPicker> = {
  args: {
    groups,
    searchable: false,
    onSelect: (item) => { console.log('selected', item) }
  }
}

export const Empty: StoryObj<typeof ColumnPicker> = {
  args: {
    groups: [],
    onSelect: (item) => { console.log('selected', item) }
  }
}

export const InPopover: StoryObj<typeof ColumnPicker> = {
  render: () => (
    <div style={ { display: 'flex', justifyContent: 'flex-end', width: 400 } }>
      <ColumnPickerPopover
        groups={ groups }
        onSelect={ (item) => { console.log('selected', item) } }
      >
        <Button type="link">+ Simple</Button>
      </ColumnPickerPopover>
    </div>
  )
}

export default config
