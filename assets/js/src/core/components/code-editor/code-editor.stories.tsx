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
import React, { useState } from 'react'
import { CodeEditor } from './code-editor'

const config: Meta = {
  title: 'Components/Data Entry/CodeEditor',
  component: CodeEditor,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
  argTypes: {
    preset: {
      control: { type: 'select' },
      options: ['text', 'yaml', 'html', 'json']
    }
  }
}

export default config

type Story = StoryObj<typeof config>

export const _default: Story = {
  args: {
    value: 'Hello, World!\nThis is a plain text editor.',
    preset: 'text',
    height: '200px'
  }
}

export const TextPreset: Story = {
  args: {
    value: `Welcome to the Code Editor!

This is a plain text preset with no syntax highlighting.
Perfect for:
- Notes
- Plain configuration
- General text editing`,
    preset: 'text',
    height: '200px'
  }
}

export const YamlPreset: Story = {
  args: {
    value: `# YAML Configuration Example
name: my-application
version: 1.0.0

database:
  host: localhost
  port: 5432
  username: admin
  password: secret

features:
  - authentication
  - logging
  - monitoring

settings:
  debug: true
  timeout: 30`,
    preset: 'yaml',
    height: '300px'
  }
}

export const JsonPreset: Story = {
  args: {
    value: `{
  "name": "my-application",
  "version": "1.0.0",
  "database": {
    "host": "localhost",
    "port": 5432,
    "username": "admin"
  },
  "features": [
    "authentication",
    "logging",
    "monitoring"
  ],
  "settings": {
    "debug": true,
    "timeout": 30
  }
}`,
    preset: 'json',
    height: '300px'
  }
}

export const WithOnChange: Story = {
  render: () => {
    const [value, setValue] = useState('Edit this text and see the console output...')

    const handleChange = (newValue: string): void => {
      setValue(newValue)
      console.log('CodeEditor value changed:', newValue)
    }

    return (
      <div>
        <CodeEditor
          height="200px"
          onChange={ handleChange }
          placeholder="Start typing..."
          preset="text"
          value={ value }
        />
        <p style={ { marginTop: 16, color: '#666' } }>
          <strong>Current value:</strong> {value}
        </p>
      </div>
    )
  }
}

export const ReadOnly: Story = {
  args: {
    value: `This editor is read-only.
You cannot edit this content.`,
    preset: 'text',
    height: '150px',
    readOnly: true
  }
}
