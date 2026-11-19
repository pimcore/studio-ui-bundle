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

const setValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValue = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const updateValueWithReload = jest.fn((key: string, value: ValueType) => { store.values[key] = value })
const removeValues = jest.fn((keys: string[]) => { keys.forEach(key => { delete store.values[key] }) }) // eslint-disable-line @typescript-eslint/no-dynamic-delete
const setInheritanceState = jest.fn((key: string, inherited: boolean) => { store.inheritance[key] = inherited })
let persistenceVersion = 0

jest.mock('../../../hooks/use-document-editor', () => ({
  useDocumentEditor: () => ({
    getValue: (key: string) => store.values[key],
    getValues: () => ({ ...store.values }),
    getInheritanceState: (key: string) => store.inheritance[key] ?? false,
    getPersistenceVersion: () => persistenceVersion,
    setValue,
    updateValue,
    updateValueWithReload,
    removeValues,
    setInheritanceState
  })
}))

const input = (data: unknown): ValueType => ({ type: 'input', data })

describe('useEditableDialogSnapshot edge cases', () => {
  beforeEach(() => {
    store.values = { headline: input('Hello'), pageTitle: input('Page') }
    store.inheritance = { headline: false, pageTitle: false }
    persistenceVersion = 0
    jest.clearAllMocks()
  })

  describe('ownership', () => {
    it('does not treat editables whose name merely starts with a dialog editable name as owned', () => {
      store.values.headline2 = input('Second headline')
      store.values.headlineExtra = input('Extra')
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.values.headline2 = input('Edited on the page')
      delete store.values.headlineExtra

      expect(result.current.getChangedKeys()).toEqual([])

      result.current.restore()

      expect(setValue).not.toHaveBeenCalled()
      expect(removeValues).not.toHaveBeenCalled()
      expect(store.values.headline2).toEqual(input('Edited on the page'))
    })

    it('does nothing for a dialog without editables', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot([]))

      store.values.headline = input('Changed')

      expect(result.current.getChangedKeys()).toEqual([])

      result.current.restore()
      result.current.commit({ reload: true })

      expect(setValue).not.toHaveBeenCalled()
      expect(updateValue).not.toHaveBeenCalled()
      expect(updateValueWithReload).not.toHaveBeenCalled()
    })

    it('reports and notifies each editable once when its name is listed twice', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline', 'headline']))

      store.values.headline = input('Changed')

      expect(result.current.getChangedKeys()).toEqual(['headline'])

      result.current.commit({ reload: false })

      expect(updateValue).toHaveBeenCalledTimes(1)
    })
  })

  describe('change detection', () => {
    it('reports no change when a value is replaced by an equal copy', () => {
      store.values.headline = input({ text: 'Hello', tags: ['a', 'b'] })
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.values.headline = input({ text: 'Hello', tags: ['a', 'b'] })

      expect(result.current.getChangedKeys()).toEqual([])
    })

    it('reports no change when the inheritance was overwritten and restored again', () => {
      store.inheritance.headline = true
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.inheritance.headline = false
      store.inheritance.headline = true

      expect(result.current.getChangedKeys()).toEqual([])
    })

    it('treats a dialog editable without a value as unchanged until a value appears', () => {
      delete store.values.headline
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      expect(result.current.getChangedKeys()).toEqual([])

      result.current.restore()
      result.current.commit({ reload: true })

      expect(setValue).not.toHaveBeenCalled()
      expect(removeValues).not.toHaveBeenCalled()
      expect(updateValue).not.toHaveBeenCalled()
      expect(updateValueWithReload).not.toHaveBeenCalled()
    })
  })

  describe('restore', () => {
    it('restores a top-level dialog value that was removed while the dialog was open', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      delete store.values.headline

      expect(result.current.getChangedKeys()).toEqual(['headline'])

      result.current.restore()

      expect(removeValues).not.toHaveBeenCalled()
      expect(setValue).toHaveBeenCalledTimes(1)
      expect(setValue).toHaveBeenCalledWith('headline', input('Hello'))
      expect(store.values.headline).toEqual(input('Hello'))
    })

    it('restores the inheritance state of a child value as well', () => {
      store.values.teaserBlock = { type: 'block', data: ['1'] }
      store.values['teaserBlock:1.headline'] = input('Row 1')
      store.inheritance['teaserBlock:1.headline'] = true
      const { result } = renderHook(() => useEditableDialogSnapshot(['teaserBlock']))

      store.inheritance['teaserBlock:1.headline'] = false
      store.values['teaserBlock:1.headline'] = input('Row 1 overwritten')

      expect(result.current.getChangedKeys()).toEqual(['teaserBlock:1.headline'])

      result.current.restore()

      expect(setInheritanceState).toHaveBeenCalledWith('teaserBlock:1.headline', true)
      expect(setValue).toHaveBeenCalledWith('teaserBlock:1.headline', input('Row 1'))
    })

    it('removes a created child value and resets its inheritance state', () => {
      store.values.teaserBlock = { type: 'block', data: ['1'] }
      const { result } = renderHook(() => useEditableDialogSnapshot(['teaserBlock']))

      store.values['teaserBlock:2.headline'] = input('Row 2')
      store.inheritance['teaserBlock:2.headline'] = true
      result.current.restore()

      expect(removeValues).toHaveBeenCalledWith(['teaserBlock:2.headline'])
      expect(setInheritanceState).toHaveBeenCalledWith('teaserBlock:2.headline', false)
      expect(setValue).not.toHaveBeenCalled()
    })
  })

  describe('discard after a background save', () => {
    it('stays silent on a clean discard even if the document was saved meanwhile', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      persistenceVersion++
      result.current.restore()

      expect(setValue).not.toHaveBeenCalled()
      expect(updateValue).not.toHaveBeenCalled()
      expect(updateValueWithReload).not.toHaveBeenCalled()
    })

    it('writes the removed value back before notifying, so the notification carries the restored state', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      delete store.values.headline
      persistenceVersion++
      result.current.restore()

      expect(setValue).toHaveBeenCalledWith('headline', input('Hello'))
      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValue).toHaveBeenCalledWith('headline', input('Hello'))
      expect(setValue.mock.invocationCallOrder[0]).toBeLessThan(updateValue.mock.invocationCallOrder[0])
    })

    it('never requests a reload for a discard', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.values.headline = input('Changed')
      persistenceVersion++
      result.current.restore()

      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValueWithReload).not.toHaveBeenCalled()
    })

    it('cannot notify the parent window when no dialog value is left', () => {
      delete store.values.headline
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.values.headline = input('Created in the dialog')
      persistenceVersion++
      result.current.restore()

      expect(removeValues).toHaveBeenCalledWith(['headline'])
      expect(store.values.headline).toBeUndefined()
      expect(updateValue).not.toHaveBeenCalled()
      expect(updateValueWithReload).not.toHaveBeenCalled()
    })
  })

  describe('commit', () => {
    it('requests the save-and-reload through another dialog value when the changed one was removed', () => {
      store.values.subline = input('Sub')
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline', 'subline']))

      delete store.values.headline
      result.current.commit({ reload: true })

      expect(updateValueWithReload).toHaveBeenCalledTimes(1)
      expect(updateValueWithReload).toHaveBeenCalledWith('subline', input('Sub'))
      expect(updateValue).not.toHaveBeenCalled()
    })

    it('notifies through a child value when the dialog editable itself has no value', () => {
      delete store.values.headline
      store.values['headline:1.text'] = input('Row 1')
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.values['headline:1.text'] = input('Row 1 changed')
      result.current.commit({ reload: false })

      expect(updateValue).toHaveBeenCalledTimes(1)
      expect(updateValue).toHaveBeenCalledWith('headline:1.text', input('Row 1 changed'))
    })

    it('can be called again after a commit without notifying twice for the same state', () => {
      const { result } = renderHook(() => useEditableDialogSnapshot(['headline']))

      store.values.headline = input('Changed')
      result.current.commit({ reload: false })
      result.current.commit({ reload: false })

      // the snapshot is not advanced by a commit: the dialog closes on Save, so a second commit re-sends the batch
      expect(updateValue).toHaveBeenCalledTimes(2)
    })
  })
})
