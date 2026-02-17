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
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { Input } from '@Pimcore/components/input/input'
import { Slider } from '@Pimcore/components/slider/slider'
import { ColorPicker } from '@Pimcore/components/color-picker/color-picker'
import { ImagePicker } from '@Pimcore/components/image-picker/image-picker'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Space } from '@Pimcore/components/space/space'
import { Flex } from '@Pimcore/components/flex/flex'
import type { Transformation } from '../../types/media-query.types'
import type { FieldConfig } from '../../dynamic-types/transformation-dynamic-type-interface'
import { TransformationDynamicTypeAbstract } from '../../dynamic-types/transformation-dynamic-type-abstract'

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
  fieldName: (string | number)[], 
  isFirst: boolean = false,
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  const fieldProps = { ...field.props }
  
  // Add ref to first field for focus management
  if (isFirst && firstInputRef) {
    fieldProps.ref = firstInputRef
  }

  switch (field.type) {
    case 'number':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <InputNumber {...fieldProps} />
        </Form.Item>
      )

    case 'select':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <Select 
            {...fieldProps}
            options={field.options?.map(option => ({
              label: option.label,
              value: option.value
            }))}
          />
        </Form.Item>
      )

    case 'boolean':
      return (
        <Form.Item 
          name={fieldName}
          valuePropName="checked"
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          <Switch {...fieldProps} />
        </Form.Item>
      )

    case 'text':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <Input {...fieldProps} />
        </Form.Item>
      )

    case 'slider':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          rules={field.required ? [{ required: true }] : undefined}
        >
          <Slider {...fieldProps} />
        </Form.Item>
      )

    case 'color-picker':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          rules={field.required ? [{ required: true }] : undefined}
          getValueFromEvent={(color: any) => {
            if (color && typeof color === 'object' && color.toHexString) {
              return color.toHexString()
            }
            if (typeof color === 'string') {
              return color
            }
            return color
          }}
          getValueProps={(value: any) => {
            return {
              value: value || field.defaultValue || '#ffffff'
            }
          }}
        >
          <ColorPicker {...fieldProps} format="hex" showText style={{ width: '200px' }} />
        </Form.Item>
      )

    case 'image-picker':
      return (
        <Form.Item 
          label={field.label}
          name={fieldName}
          rules={field.required ? [{ required: true }] : undefined}
          getValueFromEvent={(value: any) => {
            return value !== null && value !== undefined && typeof value === 'object' && value.id
              ? {
                  id: value.id,
                  type: value.type ?? 'asset',
                  subtype: 'image',
                  fullPath: value.fullPath
                }
              : null
          }}
          getValueProps={(value: any) => {
            return {
              value: value !== null && value !== undefined && typeof value === 'object' && value.id
                ? {
                    type: 'asset' as const,
                    id: value.id,
                    fullPath: value.fullPath
                  }
                : null
            }
          }}
        >
          <ImagePicker 
            {...fieldProps}
            type={fieldProps.type || 'add'}
          />
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
    // <div style={{ padding: '12px', width: '100%', boxSizing: 'border-box' }}>
      <Flex gap="small" wrap="wrap" align="flex-end">
        {fieldConfigs.map((field, index) => {
          const fieldName = [mediaQueryId, 'transformations', transformationIndex, 'config', field.name]
          const isFirst = index === 0
          return (
            <div key={field.name}>
              {renderField(field, fieldName, isFirst, firstInputRef)}
            </div>
          )
        })}
      </Flex>
    // </div>
  )
}
export function createTransformationToolStripBox(
  transformationType: TransformationDynamicTypeAbstract
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

    return (
      <ToolStripBox
        onClick={() => handleBoxClick(onFocus)}
        renderToolStripStart={renderSharedToolStrip(
          transformationType.getLabel(),
          onMoveUp,
          onMoveDown,
          onRemove
        )}
      >
        {renderFields(fieldConfigs, mediaQueryId, transformationIndex, firstInputRef)}
      </ToolStripBox>
    )
  })
}

export type { BaseTransformationToolStripBoxProps }