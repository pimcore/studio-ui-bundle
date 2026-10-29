/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'
import { useEditableDialogSnapshot } from './use-editable-dialog-snapshot'

const store: { values: Record<string, ValueType>, inheritance: Record<string, boolean> } = {
  values: {},
  inheritance: {}
}

const updateValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const removeValues = jest.fn((keys: string[]) => { keys.forEach(key => { delete store.values[key] }) }) // eslint-disable-line @typescript-eslint/no-dynamic-delete
const setInheritanceState = jest.fn((key: string, inherited: boolean) => { store.inheritance[key] = inherited })

jest.mock('../../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    getValue: (key: string) => store.values[key],
    getValues: () => ({ ...store.values }),
    getInheritanceState: (key: string) => store.inheritance[key] ?? false,
    updateValue,
    removeValues,
    setInheritanceState
  })
}))

const input = (data: unknown): ValueType => ({ type: 'input', data })

describe('useEditableDialogSnapshot', () => {
  beforeEach(() => {
    store.values = { headline: input('Hello'), pageTitle: input('Page') }
    store.inheritance = { headline: false, pageTitle: false }
    jest.clearAllMocks()
  })

  it('reports no changes right after the snapshot was taken', () => {
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    expect(result.current.getChangedKeys()).toEqual([])
  })

  it('reports an editable whose value changed since the snapshot', () => {
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.values.headline = input('Changed')

    expect(result.current.getChangedKeys()).toEqual(['headline'])
  })

  it('reports an editable whose inheritance was overwritten although its value is unchanged', () => {
    store.inheritance.headline = true
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.inheritance.headline = false

    expect(result.current.getChangedKeys()).toEqual(['headline'])
  })

  it('ignores editables that do not belong to the dialog', () => {
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.values.pageTitle = input('Edited on the page while the dialog is open')

    expect(result.current.getChangedKeys()).toEqual([])
  })

  it('keeps the snapshot from the first render when the hook re-renders after a change', () => {
    const { result, rerender } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.values.headline = input('Changed')
    rerender()

    expect(result.current.getChangedKeys()).toEqual(['headline'])
  })

  it('restores the value an editable had when the snapshot was taken', () => {
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.values.headline = input('Changed')
    result.current.restore()

    expect(updateValue).toHaveBeenCalledTimes(1)
    expect(updateValue).toHaveBeenCalledWith('headline', input('Hello'))
    expect(store.values.headline).toEqual(input('Hello'))
  })

  it('restores from a deep copy so in-place mutations of the stored value do not leak into the snapshot', () => {
    store.values.headline = input({ text: 'Hello', nested: ['a'] })
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    const liveValue = store.values.headline.data as { text: string, nested: string[] }
    liveValue.text = 'Mutated'
    liveValue.nested.push('b')
    result.current.restore()

    expect(updateValue).toHaveBeenCalledWith('headline', input({ text: 'Hello', nested: ['a'] }))
  })

  it('removes a value that only came into existence while the dialog was open', () => {
    delete store.values.headline
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.values.headline = input('Created in the dialog')
    result.current.restore()

    expect(removeValues).toHaveBeenCalledWith(['headline'])
    expect(updateValue).not.toHaveBeenCalled()
    expect(store.values.headline).toBeUndefined()
  })

  it('restores the inheritance state of an overwritten editable', () => {
    store.inheritance.headline = true
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.inheritance.headline = false
    store.values.headline = input('Overwritten')
    result.current.restore()

    expect(setInheritanceState).toHaveBeenCalledWith('headline', true)
    expect(store.inheritance.headline).toBe(true)
  })

  it('writes the value again after restoring inheritance so the draft gets saved as inherited', () => {
    // The override may already have been autosaved; only a value update schedules the next autosave.
    store.inheritance.headline = true
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

    store.inheritance.headline = false
    result.current.restore()

    expect(setInheritanceState).toHaveBeenCalledWith('headline', true)
    expect(updateValue).toHaveBeenCalledWith('headline', input('Hello'))
    expect(setInheritanceState.mock.invocationCallOrder[0]).toBeLessThan(updateValue.mock.invocationCallOrder[0])
  })

  describe('child editables of a dialog editable', () => {
    beforeEach(() => {
      store.values.teaserBlock = { type: 'block', data: ['1'] }
      store.values['teaserBlock:1.headline'] = input('Row 1')
      store.values['teaserBlockExtra'] = input('Unrelated sibling')
      store.values['other:1.headline'] = input('Row of another block')
    })

    it('reports a child value that changed since the snapshot', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['teaserBlock']))

      store.values['teaserBlock:1.headline'] = input('Row 1 changed')

      expect(result.current.getChangedKeys()).toEqual(['teaserBlock:1.headline'])
    })

    it('reports a child value created while the dialog was open', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['teaserBlock']))

      store.values.teaserBlock = { type: 'block', data: ['1', '2'] }
      store.values['teaserBlock:2.headline'] = input('Row 2')

      expect(result.current.getChangedKeys().sort()).toEqual(['teaserBlock', 'teaserBlock:2.headline'])
    })

    it('removes created child values and restores the parent on discard, leaving other editables alone', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['teaserBlock']))

      store.values.teaserBlock = { type: 'block', data: ['1', '2'] }
      store.values['teaserBlock:2.headline'] = input('Row 2')
      store.values['teaserBlockExtra'] = input('Edited on the page')
      store.values['other:1.headline'] = input('Edited on the page too')
      result.current.restore()

      expect(removeValues).toHaveBeenCalledWith(['teaserBlock:2.headline'])
      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValue).toHaveBeenCalledWith('teaserBlock', { type: 'block', data: ['1'] })
      expect(store.values['teaserBlock:2.headline']).toBeUndefined()
      expect(store.values.teaserBlockExtra).toEqual(input('Edited on the page'))
      expect(store.values['other:1.headline']).toEqual(input('Edited on the page too'))
    })

    it('restores a child value removed while the dialog was open', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['teaserBlock']))

      delete store.values['teaserBlock:1.headline']
      result.current.restore()

      expect(updateValue).toHaveBeenCalledWith('teaserBlock:1.headline', input('Row 1'))
    })
  })

  it('leaves untouched editables and editables outside the dialog alone when restoring', () => {
    store.values.subline = input('Sub')
    const { result } = renderHook(() => useEditableDialogSnapshot(['headline', 'subline']))

    store.values.headline = input('Changed')
    store.values.pageTitle = input('Edited on the page')
    result.current.restore()

    expect(updateValue).toHaveBeenCalledTimes(1)
    expect(updateValue).toHaveBeenCalledWith('headline', input('Hello'))
    expect(removeValues).not.toHaveBeenCalled()
    expect(setInheritanceState).not.toHaveBeenCalledWith('pageTitle', expect.anything())
    expect(store.values.subline).toEqual(input('Sub'))
    expect(store.values.pageTitle).toEqual(input('Edited on the page'))
  })
})
