/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Exercises "scroll the newly added column into view": BaseColumnEditor wires useScrollToLastAdded
// to its draft state via a container ref around StackList (stand-in in base-column-editor.test-mocks).

import React from 'react'
import { render, act, waitFor, screen } from '@testing-library/react'
import { dataObjectGetAvailableGridColumnsMock } from './base-column-editor.test-mocks'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'
import { ADVANCED_COLUMN_TYPE, type ColumnEditorHandle, type SchemaColumn } from './types'

// Stable reference like RTK Query's memoized result; a fresh literal per call loops the hydrate effect.
const availableGridColumnsData = {
  columns: [
    { key: 'advanced', type: 'dataobject.advanced', group: ['advanced'], sortable: false, editable: true }
  ]
}
dataObjectGetAvailableGridColumnsMock.mockReturnValue({
  data: availableGridColumnsData, currentData: availableGridColumnsData, isLoading: false
})

const fieldColumnA = {
  key: 'fieldA', type: 'input', group: ['data'], sortable: true, editable: true
} as unknown as Parameters<ColumnEditorHandle['addColumn']>[0]
const fieldColumnB = {
  key: 'fieldB', type: 'input', group: ['data'], sortable: true, editable: true
} as unknown as Parameters<ColumnEditorHandle['addColumn']>[0]

const defaultProps: BaseColumnEditorProps = {
  entity: 'CAR',
  classDefinitionId: 'CAR',
  columns: [],
  onApply: jest.fn(),
  onCancel: jest.fn(),
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers'
}

async function letScrollSettle (): Promise<void> {
  await new Promise((resolve) => { setTimeout(resolve, 100) })
}

describe('BaseColumnEditor scroll-to-newly-added-column', () => {
  let scrollIntoViewMock: jest.Mock

  beforeEach(() => {
    scrollIntoViewMock = jest.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock
  })

  it('does not scroll on the initial render, nor when the columns prop is later re-seeded', async () => {
    const { rerender } = render(
      <BaseColumnEditor
        { ...defaultProps }
        columns={ [{ key: 'existing', fieldtype: 'input', type: 'input' }] }
      />
    )
    await letScrollSettle()
    expect(scrollIntoViewMock).not.toHaveBeenCalled()

    rerender(
      <BaseColumnEditor
        { ...defaultProps }
        columns={ [
          { key: 'existing', fieldtype: 'input', type: 'input' },
          { key: 'another', fieldtype: 'input', type: 'input' }
        ] }
      />
    )
    await letScrollSettle()
    expect(scrollIntoViewMock).not.toHaveBeenCalled()
  })

  it('scrolls the row into view after adding a column via the imperative handle', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(fieldColumnA) })

    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' })
  })

  it('scrolls to only the last row when two columns are added one after another', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(fieldColumnA) })
    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })

    act(() => { ref.current?.addColumn(fieldColumnB) })
    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(2) })

    const columns = ref.current?.getColumns() ?? []
    expect(columns.map((column) => column.key)).toEqual(['fieldA', 'fieldB'])
  })

  it('scrolls after clicking "Add advanced column", adding a pipeline column', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { screen.getByText('column-editor.add-advanced-column').click() })
    await waitFor(() => { expect(scrollIntoViewMock).toHaveBeenCalledTimes(1) })

    const columns = ref.current?.getColumns() ?? []
    expect(columns).toHaveLength(1)
    expect(columns[0].type).toBe(ADVANCED_COLUMN_TYPE)
  })

  it('does not scroll when the only column is removed', async () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        columns={ [{ key: 'existing', fieldtype: 'input', type: 'input' }] }
        ref={ ref }
      />
    )

    await letScrollSettle()
    scrollIntoViewMock.mockClear()

    act(() => { screen.getByText('icon-button').click() })

    await letScrollSettle()

    expect(scrollIntoViewMock).not.toHaveBeenCalled()
    expect(ref.current?.getColumns()).toEqual([])
  })
})
