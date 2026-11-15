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
import { render, screen } from '@testing-library/react'
import { type Color } from 'antd/es/color-picker'
import { ColorInputEditable, type ColorInputEditableProps } from './color-input-editable'
import { DynamicTypeDocumentEditableInput, type InputEditableDefinition } from '../../types/dynamic-type-document-editable-input'

// The SDK barrel loads every Studio component and its styles; antd's ColorPicker is all this needs.
// The props of the last rendered picker are kept, to drive its onChange the way a pick or a clear does.
const mockPicker: { props?: { onChange: (color: Color) => void } } = {}
jest.mock('@sdk/components', () => {
  const { createElement } = jest.requireActual('react')
  const antd = jest.requireActual('antd')
  return {
    ColorPicker: ({ inherited, ...props }: any) => {
      mockPicker.props = props
      return createElement(antd.ColorPicker, props)
    }
  }
})
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: new Proxy({}, { get: (_t, key) => String(key) }), cx: (...names: any[]) => names.filter(Boolean).join(' '), theme: {} })
}))
jest.mock('../editable-overlay/editable-overlay', () => ({ EditableOverlay: ({ children }: any) => <div>{children}</div> }))

describe('ColorInputEditable', () => {
  it('shows the stored colour as an upper-case hex code', () => {
    render(<ColorInputEditable value="#3535d1" />)

    expect(screen.getByText('#3535D1')).toBeInTheDocument()
  })

  it('shows the placeholder, upper-cased, while the field is empty', () => {
    render(
      <ColorInputEditable
        placeholder="#f9f0ff"
        value=""
      />
    )

    expect(screen.getByText('#F9F0FF')).toHaveClass('placeholder')
  })

  it('stores a picked colour as its hex text, and an empty string once cleared', () => {
    const onChange = jest.fn()
    const color = (hex: string, cleared: boolean): Color => ({ cleared, toHexString: () => hex }) as unknown as Color
    render(
      <ColorInputEditable
        onChange={ onChange }
        value="#3535d1"
      />
    )

    mockPicker.props?.onChange(color('#22075e', false))
    mockPicker.props?.onChange(color('#000000', true))

    expect(onChange.mock.calls).toEqual([['#22075e'], ['']])
  })
})

describe('DynamicTypeDocumentEditableInput', () => {
  const input = new DynamicTypeDocumentEditableInput()
  // Only the config matters for which component is drawn.
  const definition = (config: InputEditableDefinition['config']): InputEditableDefinition => ({ config }) as unknown as InputEditableDefinition

  it('draws a colour picker when the config asks for one', () => {
    const element = input.getEditableDataComponent(definition({ color: true, placeholder: '#22075E' }))

    expect(element.type).toBe(ColorInputEditable)
    expect((element.props as ColorInputEditableProps).placeholder).toBe('#22075E')
  })

  it('draws the plain text field otherwise', () => {
    const element = input.getEditableDataComponent(definition({}))

    expect(element.type).not.toBe(ColorInputEditable)
  })
})
