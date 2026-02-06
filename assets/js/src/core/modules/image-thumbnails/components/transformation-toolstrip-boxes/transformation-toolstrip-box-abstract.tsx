/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 * @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 * @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

import React, { useRef } from 'react'
import { ToolStripBox } from '@Pimcore/components/toolstrip/box/tool-strip-box'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { Input } from '@Pimcore/components/input/input'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import type { Transformation } from '../types/media-query.types'
import type { TransformationDynamicTypeInterface, FieldConfig } from '../dynamic-types/transformation-dynamic-type-interface'
import { Box } from '@sdk/components'

interface BaseTransformationToolStripBoxProps {
  transformation: Transformation
  mediaQueryId: string
  transformationIndex: number
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  onFocus?: () => void
}


const renderSharedToolStrip = (
  title: string, 
  onMoveUp?: () => void, 
  onMoveDown?: () => void, 
  onRemove?: () => void
): React.ReactNode => {
  return (
    <ToolStrip title={title}>
      <Space size="mini">
        <IconButton
          icon={{ value: 'chevron-down' }}
          onClick={(e) => {
            e.stopPropagation()
            onMoveDown?.()
          }}
          size="small"
        />
        <IconButton
          icon={{ value: 'chevron-up' }}
          onClick={(e) => {
            e.stopPropagation()
            onMoveUp?.()
          }}
          size="small"
        />
      </Space>
      <IconButton
        icon={{ value: 'trash' }}
        onClick={(e) => {
          e.stopPropagation()
          onRemove?.()
        }}
        size="small"
      />
    </ToolStrip>
  )
}

const renderField = (
  field: FieldConfig, 
  fieldName: string[], 
  isFirst: boolean = false,
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  const baseProps = {
    ...field.props,
    ...(isFirst ? { ref: firstInputRef } : {})
  }

  switch (field.type) {
    case 'number':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          style={{ flex: 1, margin: 0 }}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <InputNumber {...baseProps} />
        </Form.Item>
      )

    case 'select':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          style={{ flex: 1, margin: 0 }}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <Select {...baseProps}>
            {field.options?.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )

    case 'boolean':
      return (
        <Form.Item 
          name={fieldName}
          valuePropName="checked"
          style={{ margin: 0 }}
        >
          <Switch {...baseProps} />
        </Form.Item>
      )

    case 'text':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          style={{ flex: 1, margin: 0 }}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <Input {...baseProps} />
        </Form.Item>
      )

    default:
      return null
  }
}

const renderFields = (
  fieldConfigs: FieldConfig[], 
  mediaQueryId: string, 
  transformationIndex: number,
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      {fieldConfigs.map((field, index) => {
        const fieldName = [mediaQueryId, 'transformations', transformationIndex, 'config', field.name]
        const isFirst = index === 0
        return (
          <div key={field.name} style={field.type === 'boolean' ? { alignSelf: 'flex-end' } : { flex: 1 }}>
            {renderField(field, fieldName, isFirst, firstInputRef)}
          </div>
        )
      })}
    </div>
  )
}

export function createTransformationToolStripBox(
  transformationType: TransformationDynamicTypeInterface
): React.ComponentType<BaseTransformationToolStripBoxProps> {

  return React.forwardRef<any, BaseTransformationToolStripBoxProps>((props, ref) => {
    const {
      transformation,
      mediaQueryId,
      transformationIndex,
      onRemove,
      onMoveUp,
      onMoveDown,
      onFocus
    } = props

    const firstInputRef = useRef<any>(null)

    const handleBoxClick = (onFocus?: () => void) => {
      onFocus?.()
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }

    const fieldConfigs = transformationType.getFieldConfig()

    return (<Box padding='small'>
      <ToolStripBox
        onClick={() => handleBoxClick(onFocus)}
        renderToolStripStart={renderSharedToolStrip(
          transformationType.getLabel(),
          onMoveUp,
          onMoveDown,
          onRemove
        )}
        padding={{ x: 'small', y: 'extra-small' }}
      >
        <FormKit.Panel contentPadding="small">
          {renderFields(fieldConfigs, mediaQueryId, transformationIndex, firstInputRef)}
        </FormKit.Panel>
      </ToolStripBox>
      </Box>
    )
  })
}

export type { BaseTransformationToolStripBoxProps }