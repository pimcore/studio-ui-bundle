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
import { ConfigProvider } from 'antd'
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { Input } from '@Pimcore/components/input/input'
import { Slider } from '@Pimcore/components/slider/slider'
import { ColorPicker } from '@Pimcore/components/color-picker/color-picker'
import { ImagePicker } from '@Pimcore/components/image-picker/image-picker'
import type { FieldConfig } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-interface'

/**
 * Renders a single field based on field configuration
 */
export const renderField = (
  field: FieldConfig,
  fieldName: (string | number)[],
  isFirst: boolean = false,
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  const fieldProps = { ...field.props }

  // Add ref to first field for focus management
  if (isFirst && firstInputRef != null) {
    fieldProps.ref = firstInputRef
  }

  switch (field.type) {
    case 'number':
      return (
        <Form.Item
          label={field.label}
          name={fieldName}
          rules={field.required === true ? [{ required: true }] : undefined}
        >
          <InputNumber {...fieldProps} />
        </Form.Item>
      )

    case 'select':
      return (
        <Form.Item
          label={field.label}
          name={fieldName}
          rules={field.required === true ? [{ required: true }] : undefined}
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
          rules={field.required === true ? [{ required: true }] : undefined}
        >
          <Input {...fieldProps} />
        </Form.Item>
      )

    case 'slider':
      return (
        <Form.Item
          label={field.label}
          name={fieldName}
          rules={field.required === true ? [{ required: true }] : undefined}
        >
          <Slider {...fieldProps} />
        </Form.Item>
      )

    case 'color-picker':
      return (
        <Form.Item
          label={field.label}
          name={fieldName}
          rules={field.required === true ? [{ required: true }] : undefined}
          getValueFromEvent={(color: any) => {
            if (color != null && typeof color === 'object' && color.toHexString != null) {
              return color.toHexString()
            }
            if (typeof color === 'string') {
              return color
            }
            return color
          }}
          getValueProps={(value: any) => {
            return {
              value: value ?? field.defaultValue ?? '#ffffff'
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
          rules={field.required === true ? [{ required: true }] : undefined}
          getValueFromEvent={(value: any) => {
            return value !== null && value !== undefined && typeof value === 'object' && value.id != null
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
              value: value !== null && value !== undefined && typeof value === 'object' && value.id != null
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
            type={fieldProps.type ?? 'add'}
          />
        </Form.Item>
      )

    default:
      return null
  }
}

/**
 * Renders multiple fields based on field configurations
 */
export const renderFields = (
  fieldConfigs: FieldConfig[],
  field: number = 0,
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  return (
    <Space direction="vertical" size="small" className="w-full">
      {fieldConfigs.map((fieldConfig, index) => {
        const fieldName = field !== undefined ? [field, fieldConfig.name] : [fieldConfig.name]
        const isFirst = index === 0
        return (
          <React.Fragment key={fieldConfig.name}>
            {renderField(fieldConfig, fieldName, isFirst, firstInputRef)}
          </React.Fragment>
        )
      })}
    </Space>
  )
}

/**
 * Renders multiple fields for use inside FieldCollection components (no field index needed)
 */
export const renderFieldsForFieldCollection = (
  fieldConfigs: FieldConfig[],
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  return (
    <Space direction="vertical" size="small" className="w-full">
      {fieldConfigs.map((fieldConfig, index) => {
        const fieldName = [fieldConfig.name] // FieldCollection handles the field indexing
        const isFirst = index === 0
        return (
          <React.Fragment key={fieldConfig.name}>
            {renderField(fieldConfig, fieldName, isFirst, firstInputRef)}
          </React.Fragment>
        )
      })}
    </Space>
  )
}

/**
 * Enhanced Form wrapper that fixes Ant Design form item height issues
 * by setting itemMarginBottom to 0 in the ConfigProvider
 */
export const ToolStripFormWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0
          }
        }
      }}
    >
      {children}
    </ConfigProvider>
  )
}