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
import { type NamePath } from 'antd/es/form/interface'
import { type InheritanceState } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/inheritance-state-provider'
import { useRestoreInheritance } from './use-restore-inheritance'

const resetFields = jest.fn()
const clearDataObjectAttribute = jest.fn()
const updateDraft = jest.fn(async () => {})
const restoreInheritance = jest.fn()
const onFieldRestore = jest.fn()

let inheritedState: InheritanceState | undefined
let hasEditForm = true
let keyedList: { onFieldRestore?: (field: NamePath) => void } | undefined

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/inheritance-state-provider/use-inheritance-state', () => ({
  useInheritanceState: () => ({
    getInheritanceState: () => inheritedState,
    restoreInheritance
  })
}))

jest.mock('@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/edit-form-provider/edit-form-provider', () => ({
  useEditFormContextOptional: () => hasEditForm
    ? { form: { resetFields }, clearDataObjectAttribute, updateDraft }
    : undefined
}))

jest.mock('@Pimcore/components/form/controls/keyed-list/provider/keyed-list/use-keyed-list-optional', () => ({
  useKeyedListOptional: () => keyedList
}))

const name = ['manufacturer']
const broken: InheritanceState = { objectId: 7, inherited: 'broken' }

// Explicit parameter, no default: passing undefined has to reach the hook as undefined.
const restoreField = (fieldName: NamePath | undefined, emptyValue?: unknown): boolean => {
  const { result } = renderHook(() => useRestoreInheritance(fieldName, emptyValue))
  result.current.restore()

  return result.current.canRestore
}

beforeEach(() => {
  jest.clearAllMocks()
  inheritedState = broken
  hasEditForm = true
  keyedList = undefined
})

describe('useRestoreInheritance', () => {
  describe('a field held by the Ant form store', () => {
    it('resets the field, persists it as empty and restores the state', () => {
      expect(restoreField(name)).toBe(true)

      expect(resetFields).toHaveBeenCalledWith([name])
      expect(clearDataObjectAttribute).toHaveBeenCalledWith(name, null)
      expect(updateDraft).toHaveBeenCalled()
      expect(restoreInheritance).toHaveBeenCalledWith(name)
    })

    it('clears the field with the empty value the field type asks for', () => {
      restoreField(name, [])

      expect(clearDataObjectAttribute).toHaveBeenCalledWith(name, [])
    })

    it('does nothing outside the object editor', () => {
      hasEditForm = false

      expect(restoreField(name)).toBe(false)
      expect(resetFields).not.toHaveBeenCalled()
      expect(restoreInheritance).not.toHaveBeenCalled()
    })
  })

  describe('a field held by a keyed list', () => {
    beforeEach(() => {
      keyedList = { onFieldRestore }
    })

    it('hands the field to the owner of the list and restores the state', () => {
      expect(restoreField(name)).toBe(true)

      expect(onFieldRestore).toHaveBeenCalledWith(name)
      expect(restoreInheritance).toHaveBeenCalledWith(name)
    })

    it('leaves the Ant form store alone', () => {
      restoreField(name)

      expect(resetFields).not.toHaveBeenCalled()
      expect(clearDataObjectAttribute).not.toHaveBeenCalled()
    })

    it('does nothing when the owner of the list cannot restore', () => {
      keyedList = {}

      expect(restoreField(name)).toBe(false)
      expect(restoreInheritance).not.toHaveBeenCalled()
    })
  })

  describe('fields that offer no restore', () => {
    it.each([
      ['inherited', { objectId: 7, inherited: true } satisfies InheritanceState],
      ['carrying an own value', { objectId: 1, inherited: false } satisfies InheritanceState]
    ])('leaves a field %s untouched', (_label, state) => {
      inheritedState = state

      expect(restoreField(name)).toBe(false)
      expect(restoreInheritance).not.toHaveBeenCalled()
    })

    it('leaves a field without inheritance data untouched', () => {
      inheritedState = undefined

      expect(restoreField(name)).toBe(false)
    })

    it('leaves a field without a name untouched', () => {
      expect(restoreField(undefined)).toBe(false)
      expect(restoreInheritance).not.toHaveBeenCalled()
    })
  })
})
