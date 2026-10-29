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
import { type LabelLayout, labelLayoutItemProps, LabelLayoutProvider, useLabelLayout } from './label-layout-provider'

describe('labelLayoutItemProps', () => {
  // Localizedfields::$labelWidth is persisted in pixels. antd expresses a fixed
  // label column as a flex basis, which is what FieldContainer-style sizing uses
  // elsewhere, so the number becomes `0 0 <n>px` rather than a column span.
  it('maps a label width onto a fixed label column', () => {
    expect(labelLayoutItemProps({ labelWidth: 120 })).toEqual({
      labelCol: { flex: '0 0 120px' }
    })
  })

  it('maps a left alignment onto the antd label alignment', () => {
    expect(labelLayoutItemProps({ labelAlign: 'left' })).toEqual({ labelAlign: 'left' })
  })

  it('combines a width and a left alignment', () => {
    expect(labelLayoutItemProps({ labelWidth: 80, labelAlign: 'left' })).toEqual({
      labelAlign: 'left',
      labelCol: { flex: '0 0 80px' }
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
