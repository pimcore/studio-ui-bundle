/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import { ConfigProvider } from 'antd'
import { useNumberedList } from '../numbered-list/provider/numbered-list/use-numbered-list'
import { Form } from '../../form'
import { useMultiFieldCollection } from './multi-field-collection-provider'
import { ToolStripBox } from '../../../toolstrip/box/tool-strip-box'
import { ToolStrip } from '../../../toolstrip/tool-strip'
import { IconButton } from '../../../icon-button/icon-button'
import { Space } from '../../../space/space'
import { InputNumber } from '../../../input-number/input-number'
import { Select } from '../../../select/select'
import { Switch } from '../../../switch/switch'
import { Input } from '../../../input/input'
import { Slider } from '../../../slider/slider'
import { ColorPicker } from '../../../color-picker/color-picker'
import { ImagePicker } from '../../../image-picker/image-picker'
import type { FieldConfig } from '@Pimcore/modules/image-thumbnails/dynamic-types/transformation-dynamic-type-interface'

export interface MultiFieldCollectionItemProps {
  field: number
}

const MultiFieldCollectionItemToolStrip = ({ 
  title, 
  field, 
  disallowReorder, 
  disallowAddRemove 
}: { 
  title: string
  field: number
  disallowReorder: boolean
  disallowAddRemove: boolean
}): React.ReactNode => {
  const { move, remove } = useNumberedList()

  const handleMoveUp = (): void => {
    if (!disallowReorder && field > 0) {
      move(field, field - 1)
    }
  }

  const handleMoveDown = (): void => {
    if (!disallowReorder) {
      move(field, field + 1)
    }
  }

  const handleRemove = (): void => {
    if (!disallowAddRemove) {
      remove(field)
    }
  }

  return (
    <ToolStrip title={title}>
      {!disallowReorder && (
        <Space size="mini">
          <IconButton
            icon={{ value: 'chevron-down' }}
            onClick={(e) => {
              e.stopPropagation()
              handleMoveDown()
            }}
            size="small"
          />
          <IconButton
            icon={{ value: 'chevron-up' }}
            onClick={(e) => {
              e.stopPropagation()
              handleMoveUp()
            }}
            size="small"
          />
        </Space>
      )}
      {!disallowAddRemove && (
        <IconButton
          icon={{ value: 'trash' }}
          onClick={(e) => {
            e.stopPropagation()
            handleRemove()
          }}
          size="small"
        />
      )}
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

const renderFields = (
  fieldConfigs: FieldConfig[],
  field: number,
  firstInputRef?: React.RefObject<any>
): React.ReactNode => {
  return (
    <Space direction="vertical" size="small" className="w-full">
      {fieldConfigs.map((fieldConfig, index) => {
        const fieldName = [field, fieldConfig.name]
        const isFirst = index === 0
        return renderField(fieldConfig, fieldName, isFirst, firstInputRef)
      })}
    </Space>
  )
}

/**
 * Enhanced Form wrapper that fixes Ant Design form item height issues
 * by setting itemMarginBottom to 0 in the ConfigProvider
 */
const ToolStripFormWrapper = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
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

export const MultiFieldCollectionItem = (props: MultiFieldCollectionItemProps): React.JSX.Element => {
  const { field } = props
  const { values } = useNumberedList()
  const { registry, disallowReorder, disallowAddRemove } = useMultiFieldCollection()
  const value = values[field]

  const type = value?.type
  const firstInputRef = useRef<any>(null)

  if (type == null) {
    return <div>Invalid item: missing type</div>
  }

  const registryItem = registry.getDynamicType(type as string, false)

  if (registryItem == null) {
    return <div>Unknown type: {type}</div>
  }

  const handleBoxClick = (): void => {
    setTimeout(() => firstInputRef.current?.focus(), 100)
  }

  const fieldConfigs = registryItem.getFieldConfig()

  return (
    <ToolStripFormWrapper>
      <ToolStripBox
        onClick={handleBoxClick}
        renderToolStripStart={
          <MultiFieldCollectionItemToolStrip
            title={registryItem.getLabel()}
            field={field}
            disallowReorder={disallowReorder}
            disallowAddRemove={disallowAddRemove}
          />
        }
      >
        <Form.Item
          hidden
          name={[field, 'type']}
        >
          <Input />
        </Form.Item>

        {renderFields(fieldConfigs, field, firstInputRef)}
      </ToolStripBox>
    </ToolStripFormWrapper>
  )
}