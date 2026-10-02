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
import { type AdvancedEditorColumn } from './types'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ hasDynamicType: () => false })
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { 'DynamicTypes/AdvancedGridCellRegistry': 'DynamicTypes/AdvancedGridCellRegistry' }
}))

// Box/Flex pull in antd-style's ESM build, which jest can't parse without extra transform config -
// passthrough divs are enough since this file only asserts on the text content they wrap.
jest.mock('@Pimcore/components/box/box', () => ({
  Box: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))
jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))
// Only reached on the success path (a populated `value` array), which this file's tests never
// exercise - still needs a passthrough because it's imported unconditionally at module scope and
// otherwise pulls in antd's ESM build, which jest can't parse without extra transform config.
jest.mock('@Pimcore/components/grid/grid', () => ({ Grid: () => <div data-testid="grid" /> }))
jest.mock('@Pimcore/components/grid-content-renderer/grid-content-renderer', () => ({
  GridContentRenderer: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>
}))

// Real ApiError/isApiErrorData logic (not mocked) - the fallback vs. real-message extraction is
// exactly what this file's fix is about, so it needs to be exercised for real rather than stubbed.
jest.mock('@Pimcore/modules/app/error-handler', () => {
  const actual = jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error')
  return { ApiError: actual.default, isApiErrorData: actual.isApiErrorData }
})

const useQueryMock = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: { endpoints: { dataObjectGetGridPreview: { useQuery: (...args: unknown[]) => useQueryMock(...args) } } }
}))

// eslint-disable-next-line import/first
import { ColumnPreview } from './column-preview'

const baseColumn: AdvancedEditorColumn = {
  _id: '1',
  key: 'advanced',
  fieldtype: 'advanced',
  type: 'dataobject.advanced'
}

describe('ColumnPreview - skip when the pipeline has no source fields (bug A)', () => {
  beforeEach(() => {
    useQueryMock.mockReset()
    useQueryMock.mockReturnValue({ data: undefined, error: undefined, isFetching: false })
  })

  it('skips the query and shows a hint instead of querying when there are no source fields yet', () => {
    render(
      <ColumnPreview
        column={ baseColumn }
        objectId={ 9 }
      />
    )

    expect(screen.getByText('column-editor.preview.no-source-fields')).toBeInTheDocument()
    expect(useQueryMock).toHaveBeenCalledWith(expect.anything(), { skip: true })
  })

  it('does not skip once the pipeline has at least one source field', () => {
    const column: AdvancedEditorColumn = {
      ...baseColumn,
      pipeline: { title: 'My column', sourceFields: [{ key: 'name', type: 'input' }] }
    }

    render(
      <ColumnPreview
        column={ column }
        objectId={ 9 }
      />
    )

    expect(useQueryMock).toHaveBeenCalledWith(expect.anything(), { skip: false })
    expect(screen.queryByText('column-editor.preview.no-source-fields')).not.toBeInTheDocument()
  })

  it('skips when pipelineValue is an empty object and falls back to the column pipeline', () => {
    render(
      <ColumnPreview
        column={ baseColumn }
        objectId={ 9 }
        pipelineValue={ {} }
      />
    )

    expect(useQueryMock).toHaveBeenCalledWith(expect.anything(), { skip: true })
  })
})

describe('ColumnPreview - real backend error message (bug A)', () => {
  const columnWithSourceField: AdvancedEditorColumn = {
    ...baseColumn,
    pipeline: { title: 'My column', sourceFields: [{ key: 'name', type: 'input' }] }
  }

  it('shows the backend response message when the API error carries one', () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isFetching: false,
      error: { status: 422, data: { message: 'Invalid column configuration', errorKey: 'error_invalid_argument' } }
    })

    render(
      <ColumnPreview
        column={ columnWithSourceField }
        objectId={ 9 }
      />
    )

    expect(screen.getByText('Invalid column configuration')).toBeInTheDocument()
    expect(screen.queryByText('column-editor.preview.error')).not.toBeInTheDocument()
  })

  it('falls back to the generic error text when the error is not an API error response at all', () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isFetching: false,
      error: new Error('boom')
    })

    render(
      <ColumnPreview
        column={ columnWithSourceField }
        objectId={ 9 }
      />
    )

    expect(screen.getByText('column-editor.preview.error')).toBeInTheDocument()
  })
})

describe('ColumnPreview - requested locale', () => {
  const localizedColumn = (locale?: string | null): AdvancedEditorColumn => ({
    ...baseColumn,
    localizable: true,
    locale,
    pipeline: { title: 'My column', sourceFields: [{ key: 'name', type: 'input' }] }
  })
  const requestedLocale = (): unknown => useQueryMock.mock.calls[0][0].body.column.locale

  beforeEach(() => {
    useQueryMock.mockReset()
    useQueryMock.mockReturnValue({ data: undefined, error: undefined, isFetching: false })
  })

  it('normalizes the "default" language sentinel to null, like the grid pipeline', () => {
    render(<ColumnPreview
      column={ localizedColumn('default') }
      objectId={ 9 }
           />)

    expect(requestedLocale()).toBeNull()
  })

  it('uses the pinned locale, or the current language when none is pinned', () => {
    render(<ColumnPreview
      column={ localizedColumn('de') }
      objectId={ 9 }
           />)
    expect(requestedLocale()).toBe('de')

    useQueryMock.mockClear()
    render(<ColumnPreview
      column={ localizedColumn(null) }
      objectId={ 9 }
           />)
    expect(requestedLocale()).toBe('en')
  })
})
