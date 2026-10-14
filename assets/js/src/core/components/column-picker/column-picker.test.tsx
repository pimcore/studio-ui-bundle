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
import { render } from '@testing-library/react'
import { ColumnPicker } from './column-picker'

const mockTreeElement = jest.fn<undefined, [{ height?: number }]>()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('./column-picker.styles', () => ({
  useStyles: () => ({ styles: new Proxy({}, { get: (_, key) => String(key) }) })
}))
jest.mock('@Pimcore/components/search-input/search-input', () => ({ SearchInput: () => <input /> }))
jest.mock('@Pimcore/components/tree-element/tree-element', () => ({
  TreeElement: (props: { height?: number }) => {
    mockTreeElement(props)

    return <div data-testid="tree" />
  }
}))

const groups = [{ key: 'g', label: 'Group', items: [{ key: 'a', label: 'A' }] }]

describe('ColumnPicker', () => {
  beforeEach(() => { mockTreeElement.mockClear() })

  it('passes the height to the tree so it can be virtualized', () => {
    render(<ColumnPicker
      groups={ groups }
      height={ 300 }
      onSelect={ jest.fn() }
           />)

    expect(mockTreeElement).toHaveBeenCalledWith(expect.objectContaining({ height: 300 }))
  })

  it('does not pass a height to the tree when none is given', () => {
    render(<ColumnPicker
      groups={ groups }
      onSelect={ jest.fn() }
           />)

    expect(mockTreeElement.mock.calls[0][0].height).toBeUndefined()
  })

  it('lets the virtual tree scroll itself instead of the list container', () => {
    const { container, rerender } = render(<ColumnPicker
      groups={ groups }
      height={ 300 }
      onSelect={ jest.fn() }
                                           />)

    expect(container.querySelector('.listVirtual')).not.toBeNull()
    expect(container.querySelector('.list')).toBeNull()

    rerender(<ColumnPicker
      groups={ groups }
      onSelect={ jest.fn() }
             />)

    expect(container.querySelector('.list')).not.toBeNull()
  })
})
