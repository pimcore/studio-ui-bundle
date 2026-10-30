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
import { Form, Input } from 'antd'
import { type LabelLayout, labelLayoutItemProps, LabelLayoutProvider, useLabelLayout } from './label-layout-provider'

describe('labelLayoutItemProps', () => {
  // Localizedfields::$labelWidth is persisted in pixels. antd expresses a fixed
  // label column as a flex basis, which is what FieldContainer-style sizing uses
  // elsewhere, so the number becomes `0 0 <n>px` rather than a column span.
  // The object editor's own Form is layout='vertical' (root-component.tsx), and
  // antd ignores labelCol/labelAlign entirely in a vertical layout — the label
  // owns its own row. A configured label column therefore has to opt the item
  // back into a horizontal layout, or the settings do nothing at all.
  it('maps a label width onto a fixed label column, in a horizontal layout', () => {
    expect(labelLayoutItemProps({ labelWidth: 120 })).toEqual({
      labelCol: { flex: '0 0 120px' },
      layout: 'horizontal'
    })
  })

  it('maps a left alignment onto the antd label alignment, in a horizontal layout', () => {
    expect(labelLayoutItemProps({ labelAlign: 'left' })).toEqual({
      labelAlign: 'left',
      layout: 'horizontal'
    })
  })

  it('combines a width and a left alignment', () => {
    expect(labelLayoutItemProps({ labelWidth: 80, labelAlign: 'left' })).toEqual({
      labelAlign: 'left',
      labelCol: { flex: '0 0 80px' },
      layout: 'horizontal'
    })
  })

  // 'top' is not an antd label alignment — it puts the label above the control,
  // which antd expresses as a vertical item layout. A label width is meaningless
  // once the label owns its own row, so it is deliberately dropped.
  it('maps a top alignment onto a vertical item layout and drops the width', () => {
    expect(labelLayoutItemProps({ labelWidth: 120, labelAlign: 'top' })).toEqual({
      layout: 'vertical'
    })
  })

  // An untouched class definition sends 0/null, and legacy ExtJS treated 0 as
  // "unset". Emitting nothing keeps every existing field rendering as before.
  const emptyCases: Array<[string, LabelLayout | null]> = [
    ['no layout at all', null],
    ['an empty layout', {}],
    ['a zero width', { labelWidth: 0 }],
    ['a null width', { labelWidth: null }],
    ['a null alignment', { labelAlign: null }]
  ]

  it.each(emptyCases)('emits no item props for %s', (_name, layout) => {
    expect(labelLayoutItemProps(layout)).toEqual({})
  })
})

// The mapping above is only meaningful if antd actually honours it inside the
// vertical form the object editor renders, so this exercises the real antd
// Form.Item rather than a stand-in.
describe('labelLayoutItemProps against a real antd Form.Item', () => {
  const renderItem = (itemProps: object): HTMLElement => {
    const { container } = render(
      <Form layout='vertical'>
        <Form.Item
          label='firstname'
          name='firstname'
          { ...itemProps }
        >
          <Input />
        </Form.Item>
      </Form>
    )

    return container
  }

  it('gives the label a fixed column in a side-by-side row', () => {
    const container = renderItem(labelLayoutItemProps({ labelWidth: 120, labelAlign: 'left' }))

    expect(container.querySelector('.ant-form-item')?.className).toContain('ant-form-item-horizontal')
    expect(container.querySelector<HTMLElement>('.ant-form-item-label')?.getAttribute('style')).toBe('flex: 0 0 120px;')
  })

  // The bug this mapping exists to avoid. antd still writes the flex basis onto
  // the label, but the item keeps inheriting the form's vertical layout — it
  // gains no horizontal modifier — so the label stays on its own row above the
  // control and the configured column never becomes side-by-side. The explicit
  // horizontal opt-in is what makes the setting take effect at all.
  it('does not become side-by-side without the horizontal opt-in', () => {
    const container = renderItem({ labelAlign: 'left', labelCol: { flex: '0 0 120px' } })

    expect(container.querySelector('.ant-form-item')?.className)
      .not.toContain('ant-form-item-horizontal')
  })

  it('puts the label on its own row for a top alignment', () => {
    const container = renderItem(labelLayoutItemProps({ labelAlign: 'top' }))

    expect(container.querySelector('.ant-form-item')?.className).toContain('ant-form-item-vertical')
  })
})

describe('LabelLayoutProvider', () => {
  const Probe = (): React.JSX.Element => {
    const layout = useLabelLayout()

    return (
      <span data-testid='probe'>
        { JSON.stringify(layout) }
      </span>
    )
  }

  it('publishes the layout to a descendant', () => {
    render(
      <LabelLayoutProvider
        labelAlign='left'
        labelWidth={ 150 }
      >
        <Probe />
      </LabelLayoutProvider>
    )

    expect(JSON.parse(screen.getByTestId('probe').textContent ?? 'null')).toEqual({
      labelAlign: 'left',
      labelWidth: 150
    })
  })

  // Every field outside a configured container must keep antd's own defaults,
  // so the absence of a provider has to be distinguishable from an empty one.
  it('reads as null when no provider is present', () => {
    render(<Probe />)

    expect(screen.getByTestId('probe').textContent).toBe('null')
  })
})
