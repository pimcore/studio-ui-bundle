/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// Covers the classification store group/key picker (`use-classification-store-column-picker.ts`),
// driven through the imperative handle's `addColumn`. Group/key picks are simulated by invoking the
// `onUpdate` callback captured by the modal stub in base-column-editor.test-mocks.tsx.

import React from 'react'
import { render, act } from '@testing-library/react'
import { classificationStoreModal } from './base-column-editor.test-mocks'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'
import { type ColumnEditorHandle, type SchemaColumn } from './types'

const classificationStoreColumn = {
  key: 'technicalAttributes',
  group: ['data'],
  sortable: false,
  editable: true,
  localizable: true,
  type: 'dataobject.classificationstore',
  config: { fieldDefinition: { storeId: 1, name: 'technicalAttributes', title: 'Technical attributes' } }
} as unknown as Parameters<ColumnEditorHandle['addColumn']>[0]

const defaultProps: BaseColumnEditorProps = {
  entity: 'AP',
  classDefinitionId: 'AP',
  columns: [],
  onApply: jest.fn(),
  onCancel: jest.fn(),
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers'
}

describe('BaseColumnEditor classification store column picker', () => {
  beforeEach(() => {
    classificationStoreModal.openModal.mockClear()
    classificationStoreModal.onUpdate = undefined
  })

  it('opens the group/key picker instead of adding the container field directly', () => {
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(classificationStoreColumn) })

    expect(classificationStoreModal.openModal).toHaveBeenCalledWith({
      storeId: 1,
      classId: 'AP',
      fieldName: 'technicalAttributes',
      name: 'technicalAttributes',
      allowedTabs: ['group-by-key']
    })
    expect(ref.current?.getColumns()).toEqual([])
  })

  it('adds one column per picked key, and skips a key already present in the draft', () => {
    const onChange = jest.fn()
    const ref = React.createRef<ColumnEditorHandle>()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        onChange={ onChange }
        ref={ ref }
      />
    )

    act(() => { ref.current?.addColumn(classificationStoreColumn) })
    expect(classificationStoreModal.onUpdate).toBeDefined()

    act(() => {
      classificationStoreModal.onUpdate?.({
        type: 'group-by-key',
        data: [
          {
            id: 1,
            groupId: 1,
            name: 'height',
            groupName: 'Dimensions',
            definition: { fieldtype: 'quantityValue', title: 'Height' }
          },
          {
            id: 2,
            groupId: 1,
            name: 'width',
            groupName: 'Dimensions',
            definition: { fieldtype: 'quantityValue', title: 'Width' }
          }
        ]
      })
    })

    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({
        key: 'technicalAttributes',
        fieldtype: 'quantityValue',
        type: 'dataobject.classificationstore',
        // No literal "default" is written here any more, localizable or not.
        locale: undefined,
        config: {
          keyId: 1,
          groupId: 1,
          fieldDefinition: { fieldtype: 'quantityValue', title: 'Height' },
          groupName: 'Dimensions'
        }
      }),
      expect.objectContaining({
        key: 'technicalAttributes',
        config: expect.objectContaining({ keyId: 2, groupId: 1 })
      })
    ])

    // Picking the very same group/key again (e.g. reopening the picker for the same column)
    // must not add a duplicate.
    act(() => {
      classificationStoreModal.onUpdate?.({
        type: 'group-by-key',
        data: [
          {
            id: 1,
            groupId: 1,
            name: 'height',
            groupName: 'Dimensions',
            definition: { fieldtype: 'quantityValue', title: 'Height' }
          }
        ]
      })
    })

    expect((onChange.mock.calls[onChange.mock.calls.length - 1][0] as SchemaColumn[])).toHaveLength(2)
  })
})
