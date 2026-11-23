/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DragEndEvent } from '@dnd-kit/core'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// antd-style is untranspiled ESM and the real styles inject CSS jsdom cannot parse.
jest.mock('../../select.styles', () => ({
  useStyles: () => ({ styles: new Proxy({}, { get: (_target, name) => String(name) }) })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({ Icon: () => null }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => null }))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/use-field-width', () => ({
  useFieldWidthOptional: () => undefined
}))

// jsdom has no layout, so a real pointer drag cannot be simulated. Capture the drop handler and call it directly.
let dropHandler: ((event: DragEndEvent) => void) | undefined
jest.mock('@dnd-kit/core', () => {
  const actual = jest.requireActual('@dnd-kit/core')
  const { createElement } = jest.requireActual('react')

  return {
    ...actual,
    DndContext: (props: { onDragEnd?: (event: DragEndEvent) => void }) => {
      dropHandler = props.onDragEnd
      return createElement(actual.DndContext, props)
    }
  }
})

/* eslint-disable import/first */
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Select, type SelectProps } from '../../select'

const options = [
  { label: 'Austria', value: 'AT' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' }
]

const drop = (activeId: string, overId: string): void => {
  dropHandler?.({ active: { id: activeId }, over: { id: overId } } as unknown as DragEndEvent)
}

const renderSelect = (props: Partial<SelectProps> = {}): jest.Mock => {
  const onChange = jest.fn()
  render(
    <Select
      mode="multiple"
      onChange={ onChange }
      options={ options }
      sortableTags
      value={ ['AT', 'DE', 'FR'] }
      { ...props }
    />
  )

  return onChange
}

const getHandles = (): HTMLElement[] => Array.from(document.querySelectorAll('[aria-roledescription="sortable"]'))

beforeEach(() => {
  dropHandler = undefined
})

describe('Select sortableTags', () => {
  it('makes the tag labels drag handles and keeps the remove button outside of them', () => {
    renderSelect()

    expect(getHandles().map(handle => handle.textContent)).toEqual(['Austria', 'Germany', 'France'])
    expect(getHandles().some(handle => handle.querySelector('button') !== null)).toBe(false)
    expect(document.querySelectorAll('button[aria-label="remove"]')).toHaveLength(3)
  })

  it('reports the new order together with the reordered options', () => {
    const onChange = renderSelect()

    drop('string:FR', 'string:AT')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(['FR', 'AT', 'DE'], [options[2], options[0], options[1]])
  })

  it('keeps labelInValue entries', () => {
    const value = [{ value: 'AT', label: 'Austria' }, { value: 'DE', label: 'Germany' }]
    const onChange = renderSelect({ labelInValue: true, value })

    drop('string:DE', 'string:AT')

    expect(onChange).toHaveBeenCalledWith([value[1], value[0]], [options[1], options[0]])
  })

  it('cannot be reordered when the select is disabled', () => {
    const onChange = renderSelect({ disabled: true })

    expect(getHandles()).toHaveLength(0)

    drop('string:FR', 'string:AT')

    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not open the dropdown when a drag starts on a tag', () => {
    const onDropdownVisibleChange = jest.fn()
    renderSelect({ onDropdownVisibleChange })

    fireEvent.mouseDown(getHandles()[0])

    expect(onDropdownVisibleChange).not.toHaveBeenCalled()
  })

  it('does not remove the last tag on Backspace while a tag label has focus', () => {
    const onChange = renderSelect()

    fireEvent.keyDown(getHandles()[0], { key: 'Backspace', code: 'Backspace' })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('does not open the dropdown on Enter while a tag label has focus', () => {
    const onDropdownVisibleChange = jest.fn()
    renderSelect({ onDropdownVisibleChange })

    fireEvent.keyDown(getHandles()[0], { key: 'Enter', code: 'Enter' })

    expect(onDropdownVisibleChange).not.toHaveBeenCalled()
  })

  it('renders the default tags without sortableTags', () => {
    renderSelect({ sortableTags: false })

    expect(getHandles()).toHaveLength(0)
    expect(dropHandler).toBeUndefined()
  })
})
