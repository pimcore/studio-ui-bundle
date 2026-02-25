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
import { type TransformationDynamicTypeAbstract } from '../../dynamic-types/transformation-dynamic-type-abstract'

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
    <ToolStrip title={ title }>
      <Space size="mini">
        <IconButton
          icon={ { value: 'chevron-down' } }
          onClick={ (e) => {
            e.stopPropagation()
            onMoveDown?.()
          } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-up' } }
          onClick={ (e) => {
            e.stopPropagation()
            onMoveUp?.()
          } }
          size="small"
        />
      </Space>
      <IconButton
        icon={ { value: 'trash' } }
        onClick={ (e) => {
          e.stopPropagation()
          onRemove?.()
        } }
        size="small"
      />
    </ToolStrip>
  )
}

const renderField = (
  field: FieldConfig,
  fieldName: Array<string | number>,
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
          label={ field.label }
          name={ fieldName }
          rules={ (field.required === true) ? [{ required: true }] : undefined }
        >
          <InputNumber { ...fieldProps } />
        </Form.Item>
      )

    case 'select':
      return (
        <Form.Item
          label={ field.label }
          name={ fieldName }
          rules={ (field.required === true) ? [{ required: true }] : undefined }
        >
          <Select
            { ...fieldProps }
            options={ field.options?.map(option => ({
              label: option.label,
              value: option.value
            })) }
          />
        </Form.Item>
      )

    case 'boolean':
      return (
        <Form.Item
          name={ fieldName }
          style={ { marginBottom: 0, marginTop: 0 } }
          valuePropName="checked"
        >
          <Switch { ...fieldProps } />
        </Form.Item>
      )

    case 'text':
      return (
        <Form.Item
          label={ field.label }
          name={ fieldName }
          rules={ (field.required === true) ? [{ required: true }] : undefined }
        >
          <Input { ...fieldProps } />
        </Form.Item>
      )

    case 'slider':
      return (
        <Form.Item
          label={ field.label }
          name={ fieldName }
          rules={ (field.required === true) ? [{ required: true }] : undefined }
        >
          <Slider { ...fieldProps } />
        </Form.Item>
      )

    case 'color-picker':
      return (
        <Form.Item
          getValueFromEvent={ (color: any) => {
            if ((color != null) && typeof color === 'object' && (color.toHexString != null)) {
              return color.toHexString()
            }
            if (typeof color === 'string') {
              return color
            }
            return color
          } }
          getValueProps={ (value: any) => {
            return {
              value: value ?? field.defaultValue ?? '#ffffff'
            }
          } }
          label={ field.label }
          name={ fieldName }
          rules={ (field.required === true) ? [{ required: true }] : undefined }
        >
          <ColorPicker
            { ...fieldProps }
            format="hex"
            showText
            style={ { width: '200px' } }
          />
        </Form.Item>
      )

    case 'image-picker':
      return (
        <Form.Item
          getValueFromEvent={ (value: any) => {
            return (value != null) && typeof value === 'object' && (value.id != null)
              ? {
                  id: value.id,
                  type: value.type ?? 'asset',
                  subtype: 'image',
                  fullPath: value.fullPath
                }
              : null
          } }
          getValueProps={ (value: any) => {
            return {
              value: (value != null) && typeof value === 'object' && (value.id != null)
                ? {
                    type: 'asset' as const,
                    id: value.id,
                    fullPath: value.fullPath
                  }
                : null
            }
          } }
          label={ field.label }
          name={ fieldName }
          rules={ (field.required === true) ? [{ required: true }] : undefined }
        >
          <ImagePicker
            { ...fieldProps }
            type={ fieldProps.type ?? 'add' }
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
    <Flex
      align="flex-end"
      gap="small"
      wrap="wrap"
    >
      {fieldConfigs.map((field, index) => {
        const fieldName = [mediaQueryId, 'transformations', transformationIndex, 'config', field.name]
        const isFirst = index === 0
        return (
          <div key={ field.name }>
            {renderField(field, fieldName, isFirst, firstInputRef)}
          </div>
        )
      })}
    </Flex>
  )
}
export function createTransformationToolStripBox (
  transformationType: TransformationDynamicTypeAbstract
): React.ComponentType<BaseTransformationToolStripBoxProps> {
  const Component = React.forwardRef<any, BaseTransformationToolStripBoxProps>((props, ref) => {
    const {
      mediaQueryId,
      transformationIndex,
      onRemove,
      onMoveUp,
      onMoveDown,
      onFocus
    } = props

    const firstInputRef = useRef<any>(null)

    const handleBoxClick = (onFocus?: () => void): void => {
      onFocus?.()
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }

    const fieldConfigs = transformationType.getFieldConfig()

    return (
      <ToolStripBox
        onClick={ () => { handleBoxClick(onFocus) } }
        renderToolStripStart={ renderSharedToolStrip(
          transformationType.getLabel(),
          onMoveUp,
          onMoveDown,
          onRemove
        ) }
      >
        {renderFields(fieldConfigs, mediaQueryId, transformationIndex, firstInputRef)}
      </ToolStripBox>
    )
  })

  Component.displayName = `TransformationToolStripBox(${transformationType.getId()})`

  return Component
}

export type { BaseTransformationToolStripBoxProps }
