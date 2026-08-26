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
import { useTranslation } from 'react-i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { Tag } from '@Pimcore/components/tag/tag'
import { Select } from '@Pimcore/components/select/select'
import { type McpTool } from '../../mcp-servers-api-slice.gen'

interface ToolsFieldProps {
  tools: McpTool[]
  value: string[]
  onChange: (ids: string[]) => void
  disabled?: boolean
}

export const ToolsField = ({ tools, value, onChange, disabled = false }: ToolsFieldProps): React.JSX.Element => {
  const { t } = useTranslation()

  const renderScopeBadge = (requiredScope: string): React.JSX.Element => {
    const isWrite = requiredScope === 'mcp:write'
    return (
      <Tag>{isWrite ? t('mcp-servers.badge.write') : t('mcp-servers.badge.read')}</Tag>
    )
  }

  const options = tools.map((tool) => ({
    value: tool.name,
    label: tool.title
  }))

  const optionRender = (option: { value?: string | number | null }): React.ReactNode => {
    const tool = tools.find((candidate) => candidate.name === option.value)

    if (tool === undefined) {
      return option.value
    }

    return (
      <Flex
        gap="mini"
        vertical
      >
        <Flex
          align="center"
          gap="mini"
        >
          <Text>{tool.title}</Text>
          {renderScopeBadge(tool.requiredScope)}
        </Flex>
        <Text type="secondary">{tool.description}</Text>
      </Flex>
    )
  }

  return (
    <Select
      disabled={ disabled }
      mode="multiple"
      onChange={ (selected) => { onChange(selected as string[]) } }
      optionRender={ optionRender }
      options={ options }
      placeholder={ t('mcp-servers.editor.tools-placeholder') }
      style={ { width: '100%' } }
      value={ value }
    />
  )
}
