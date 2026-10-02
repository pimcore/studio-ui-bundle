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
import { skipToken } from '@reduxjs/toolkit/query'
import {
  classDefinitionCollectionQueryMock,
  dataObjectGetAvailableGridColumnsMock,
  dataObjectGetGridMock,
  resetQueryMocks
} from './base-column-editor.test-mocks'
import { BaseColumnEditor, type BaseColumnEditorProps } from './base-column-editor'

const defaultProps: BaseColumnEditorProps = {
  entity: 'CAR',
  classDefinitionId: 'CAR',
  columns: [],
  onApply: jest.fn(),
  onCancel: jest.fn(),
  sourceFieldsRegistryId: 'sourceFields',
  transformersRegistryId: 'transformers'
}

describe('BaseColumnEditor toolbar visibility', () => {
  it('renders both the add-column and the apply/discard controls by default', () => {
    render(<BaseColumnEditor { ...defaultProps } />)

    expect(screen.getByText('column-editor.add-column')).toBeInTheDocument()
    expect(screen.getByText('column-editor.apply')).toBeInTheDocument()
    expect(screen.getByText('column-editor.discard')).toBeInTheDocument()
  })

  it('hideApplyDiscard hides Apply/Discard but keeps the add-column buttons', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideApplyDiscard
      />
    )

    expect(screen.getByText('column-editor.add-column')).toBeInTheDocument()
    expect(screen.queryByText('column-editor.apply')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.discard')).not.toBeInTheDocument()
  })

  it('hideAddButtons hides the add-column buttons but keeps Apply/Discard', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideAddButtons
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.getByText('column-editor.apply')).toBeInTheDocument()
    expect(screen.getByText('column-editor.discard')).toBeInTheDocument()
  })

  it('the deprecated hideToolbar alias hides both halves', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideToolbar
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.apply')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.discard')).not.toBeInTheDocument()
  })

  it('an explicit split flag overrides the deprecated hideToolbar alias', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideApplyDiscard={ false }
        hideToolbar
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.getByText('column-editor.apply')).toBeInTheDocument()
    expect(screen.getByText('column-editor.discard')).toBeInTheDocument()
  })

  it('readOnly hides both halves regardless of the split flags', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hideAddButtons={ false }
        hideApplyDiscard={ false }
        readOnly
      />
    )

    expect(screen.queryByText('column-editor.add-column')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.apply')).not.toBeInTheDocument()
    expect(screen.queryByText('column-editor.discard')).not.toBeInTheDocument()
  })
})

describe('BaseColumnEditor without a ClassDefinitionsProvider ancestor', () => {
  // Regression: the document editor iframe realm (BPT `outputdata` editable) has no
  // ClassDefinitionsProvider; useColumnEditorState() used to call useClassDefinitions()
  // unconditionally and threw on mount. Rendering here without one is the check, and the
  // class-lookup query must be skipped when classDefinitionId is supplied.
  beforeEach(() => {
    classDefinitionCollectionQueryMock.mockClear()
  })

  it('renders with classDefinitionId supplied, skipping the class-lookup fallback query', () => {
    render(<BaseColumnEditor { ...defaultProps } />)

    expect(screen.getByText('column-editor.add-column')).toBeInTheDocument()
    expect(classDefinitionCollectionQueryMock).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ skip: true })
    )
  })
})

describe('BaseColumnEditor resolving the class id from the entity name', () => {
  // Regression: while the class-definition lookup was in flight, resolvedClassId fell back to the
  // class NAME, firing available-columns/grid requests against the wrong id.
  beforeEach(() => {
    classDefinitionCollectionQueryMock.mockClear()
    dataObjectGetAvailableGridColumnsMock.mockClear()
    dataObjectGetGridMock.mockClear()
  })

  afterEach(resetQueryMocks)

  it('does not request columns for the raw entity name while the lookup is in flight', () => {
    classDefinitionCollectionQueryMock.mockReturnValue({ data: undefined, isLoading: true })

    render(
      <BaseColumnEditor
        { ...defaultProps }
        classDefinitionId={ undefined }
      />
    )

    expect(screen.getByTestId('spin')).toBeInTheDocument()
    expect(dataObjectGetAvailableGridColumnsMock).toHaveBeenCalledWith(skipToken)
    expect(dataObjectGetGridMock).toHaveBeenCalledWith(skipToken)
  })

  it('resolves the class id by name once the lookup completes and requests with the real id', () => {
    classDefinitionCollectionQueryMock.mockReturnValue({
      data: { items: [{ id: 'CAR_ID', name: 'CAR' }] },
      isLoading: false
    })

    render(
      <BaseColumnEditor
        { ...defaultProps }
        classDefinitionId={ undefined }
      />
    )

    expect(dataObjectGetAvailableGridColumnsMock).toHaveBeenCalledWith({ classId: 'CAR_ID', folderId: 1 })
    expect(dataObjectGetGridMock).toHaveBeenCalledWith(
      expect.objectContaining({ classId: 'CAR_ID' })
    )
  })
})

describe('BaseColumnEditor hidePreviewControls/onChange (review round 2, findings J/A)', () => {
  it('renders the preview controls by default and does not fire onChange on mount', () => {
    const onChange = jest.fn()
    render(
      <BaseColumnEditor
        { ...defaultProps }
        onChange={ onChange }
      />
    )

    expect(screen.getByText('column-editor.preview.select-object')).toBeInTheDocument()
    expect(screen.getByTestId('language-selection')).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('hides the preview controls when hidePreviewControls is set', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        hidePreviewControls
      />
    )

    expect(screen.queryByText('column-editor.preview.select-object')).not.toBeInTheDocument()
    expect(screen.queryByTestId('language-selection')).not.toBeInTheDocument()
  })
})

// Regression: the body always sized itself to calc(80vh - 200px) (right for the Data Hub modal),
// leaving whitespace in hosts with a definite height. `fillHeight` opts out of the fixed height.
describe('BaseColumnEditor fillHeight', () => {
  it('defaults to the fixed calc(80vh - 200px) height for existing modal consumers', () => {
    render(<BaseColumnEditor { ...defaultProps } />)

    expect(screen.getByTestId('content')).toHaveStyle({ height: 'calc(80vh - 200px)' })
  })

  it('fillHeight={false} keeps the fixed height explicitly', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        fillHeight={ false }
      />
    )

    expect(screen.getByTestId('content')).toHaveStyle({ height: 'calc(80vh - 200px)' })
  })

  it('fillHeight omits the fixed height so Content\'s own 100% default can take over', () => {
    render(
      <BaseColumnEditor
        { ...defaultProps }
        fillHeight
      />
    )

    expect(screen.getByTestId('content').getAttribute('style')).toBeFalsy()
  })
})
