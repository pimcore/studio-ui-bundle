/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { type AdvancedManyToManyRelationValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/types/advanced-many-to-many-relation'
import { useBatchEditActions } from './use-batch-edit-actions'

const row = (id: number, data: Record<string, unknown> = {}): any => ({
  element: { id, type: 'object', subtype: 'Car', fullPath: `/cars/${id}`, isPublished: true },
  data
})

/** Rows 0 and 2 are the same element — only possible with allowMultipleAssignments. */
const withDuplicates = (): AdvancedManyToManyRelationValue =>
  [row(10, { note: 'a' }), row(20, { note: 'b' }), row(10, { note: 'c' })] as AdvancedManyToManyRelationValue

interface Setup {
  result: { current: ReturnType<typeof useBatchEditActions> }
  onChange: jest.Mock
}

const setup = (value: AdvancedManyToManyRelationValue): Setup => {
  const onChange = jest.fn()
  const { result } = renderHook(() => useBatchEditActions({ value, onChange }))

  return { result, onChange }
}

const select = (setup: Setup, keys: string[]): void => {
  act(() => {
    setup.result.current.setSelectedRows(Object.fromEntries(keys.map((key) => [key, true])))
  })
}

describe('useBatchEditActions', () => {
  describe('selection targeting', () => {
    it('edits only the ticked row when the same element appears more than once', () => {
      const s = setup(withDuplicates())
      select(s, ['0'])

      act(() => { s.result.current.handleBatchApply([{ columnKey: 'note', value: 'edited' }]) })

      expect(s.onChange.mock.calls[0][0].map((r: any) => r.data.note)).toEqual(['edited', 'b', 'c'])
    })

    it('deletes only the ticked occurrence of a duplicated element', () => {
      const s = setup(withDuplicates())
      select(s, ['2'])

      act(() => { s.result.current.handleBatchDelete() })

      expect(s.onChange.mock.calls[0][0].map((r: any) => r.data.note)).toEqual(['a', 'b'])
    })

    it('ignores selection keys that fall outside the current value', () => {
      const s = setup(withDuplicates())
      select(s, ['99'])

      act(() => { s.result.current.handleBatchApply([{ columnKey: 'note', value: 'edited' }]) })

      // No row matched, so nothing is rewritten.
      expect(s.onChange.mock.calls[0][0].map((r: any) => r.data.note)).toEqual(['a', 'b', 'c'])
    })
  })

  describe('apply', () => {
    it('applies every column in a single update', () => {
      const s = setup(withDuplicates())
      select(s, ['1'])

      act(() => {
        s.result.current.handleBatchApply([
          { columnKey: 'note', value: 'x' },
          { columnKey: 'other', value: 'y' }
        ])
      })

      expect(s.onChange).toHaveBeenCalledTimes(1)
      expect(s.onChange.mock.calls[0][0][1].data).toEqual({ note: 'x', other: 'y' })
    })

    it('joins multiselect values', () => {
      const s = setup(withDuplicates())
      select(s, ['0'])

      act(() => { s.result.current.handleBatchApply([{ columnKey: 'tags', value: ['a', 'b'] }]) })

      expect(s.onChange.mock.calls[0][0][0].data.tags).toBe('a,b')
    })

    it('applies to every row when nothing is selected', () => {
      const s = setup(withDuplicates())

      act(() => { s.result.current.handleBatchApply([{ columnKey: 'note', value: 'all' }]) })

      expect(s.onChange.mock.calls[0][0].map((r: any) => r.data.note)).toEqual(['all', 'all', 'all'])
    })

    it('does nothing without entries', () => {
      const s = setup(withDuplicates())

      act(() => { s.result.current.handleBatchApply([]) })

      expect(s.onChange).not.toHaveBeenCalled()
    })

    it('clears the selection so it cannot go stale', () => {
      const s = setup(withDuplicates())
      select(s, ['0'])

      act(() => { s.result.current.handleBatchApply([{ columnKey: 'note', value: 'x' }]) })

      expect(s.result.current.selectedRows).toEqual({})
    })
  })

  describe('delete', () => {
    it('empties the relation when nothing is selected', () => {
      const s = setup(withDuplicates())

      act(() => { s.result.current.handleBatchDelete() })

      expect(s.onChange).toHaveBeenCalledWith([])
    })

    it('clears the selection afterwards', () => {
      const s = setup(withDuplicates())
      select(s, ['1'])

      act(() => { s.result.current.handleBatchDelete() })

      expect(s.result.current.selectedRows).toEqual({})
    })
  })
})
