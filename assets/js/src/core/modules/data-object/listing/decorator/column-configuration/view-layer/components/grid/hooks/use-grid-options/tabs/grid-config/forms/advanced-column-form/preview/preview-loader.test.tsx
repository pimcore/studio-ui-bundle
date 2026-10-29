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
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('./preview-loader.styles', () => ({
  useStyles: () => ({ styles: { descriptionText: 'descriptionText' } })
}))

jest.mock('./preview-value', () => ({
  PreviewValue: () => <div data-testid="preview-value" />
}))

jest.mock('./preview-item-provider', () => ({
  usePreviewItem: () => ({ item: null })
}))

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data', () => ({
  useData: () => ({ data: { items: [{ id: 9 }] } })
}))

// Real ApiError/isApiErrorData logic (not mocked) - the fallback vs. real-message extraction is
// exactly what this file's fix is about, so it needs to be exercised for real rather than stubbed.
jest.mock('@Pimcore/modules/app/error-handler', () => {
  const actual = jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error')
  return { ApiError: actual.default, isApiErrorData: actual.isApiErrorData }
})

const useQueryMock = jest.fn()
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  useDataObjectGetGridPreviewQuery: (...args: unknown[]) => useQueryMock(...args)
}))

// eslint-disable-next-line import/first
import { PreviewLoader } from './preview-loader'

const baseColumn: AvailableColumn = {
  key: 'advanced',
  type: 'dataobject.advanced',
  // The "fields to add" schema catalog (simpleField/relationField groups) used to populate the
  // source-field/transformer pickers for a column not yet touched by the user - NOT an actual
  // field selection. Sending this as the query's `config` is exactly what caused every freshly
  // added, untouched advanced column to 422 with "Advanced column config is not set".
  config: { simpleField: [{ name: 'Length', key: 'attributes.Dimensions.length' }] }
} as unknown as AvailableColumn

describe('PreviewLoader - skip when no source fields have been picked yet (bug A, native Grid Config)', () => {
  beforeEach(() => {
    useQueryMock.mockReset()
    useQueryMock.mockReturnValue({ data: undefined, error: undefined })
  })

  it('skips the query and shows a hint for a freshly added, untouched advanced column', () => {
    render(<PreviewLoader column={ baseColumn } />)

    expect(screen.getByText('grid.advanced-column.no-source-fields')).toBeInTheDocument()
    expect(useQueryMock).toHaveBeenCalledWith(expect.anything(), { skip: true })
  })

  it('does not skip once the user has picked at least one source field', () => {
    const column: AvailableColumn = {
      ...baseColumn,
      __meta: { advancedColumnConfig: { title: 'My column', advancedColumns: [{ key: 'name' }] } }
    } as unknown as AvailableColumn

    render(<PreviewLoader column={ column } />)

    expect(useQueryMock).toHaveBeenCalledWith(expect.anything(), { skip: false })
    expect(screen.queryByText('grid.advanced-column.no-source-fields')).not.toBeInTheDocument()
  })

  it('sends only the live pipeline value as config, never the fields-to-add schema catalog', () => {
    const column: AvailableColumn = {
      ...baseColumn,
      __meta: { advancedColumnConfig: { title: 'My column', advancedColumns: [{ key: 'name' }] } }
    } as unknown as AvailableColumn

    render(<PreviewLoader column={ column } />)

    const [arg] = useQueryMock.mock.calls[0] as [{ body: { column: { config: unknown } } }]
    expect(arg.body.column.config).toEqual({ title: 'My column', advancedColumns: [{ key: 'name' }] })
  })
})

describe('PreviewLoader - real backend error message (bug A, native Grid Config)', () => {
  const columnWithSourceField: AvailableColumn = {
    ...baseColumn,
    __meta: { advancedColumnConfig: { title: 'My column', advancedColumns: [{ key: 'name' }] } }
  } as unknown as AvailableColumn

  it('shows the backend response message when the API error carries one', () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      error: { status: 422, data: { message: 'Advanced column config is not set', errorKey: 'error_invalid_argument' } }
    })

    render(<PreviewLoader column={ columnWithSourceField } />)

    expect(screen.getByText('Advanced column config is not set')).toBeInTheDocument()
  })
})
