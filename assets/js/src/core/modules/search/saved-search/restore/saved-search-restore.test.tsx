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
import { SavedSearchRestore } from './saved-search-restore'

const applySavedSearch = jest.fn()
const setPendingRestore = jest.fn()

let pendingRestore: Record<string, unknown> | undefined
let availableColumns: Array<{ key: string }> = []
let selectedColumns: Array<{ key: string, locale?: string | null, width?: number | null }> = []

jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  useSearch: () => ({ pendingRestore, setPendingRestore })
}))
jest.mock('@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns', () => ({
  useAvailableColumns: () => ({ availableColumns })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ selectedColumns })
}))
jest.mock('./use-apply-saved-search', () => ({
  useApplySavedSearch: () => applySavedSearch
}))

const assetSearch = (columns: Array<{ key: string }>): Record<string, unknown> => ({
  elementType: 'asset',
  columns,
  filter: [{ columnFilters: [] }]
})

describe('SavedSearchRestore', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    availableColumns = [{ key: 'id' }, { key: 'filename' }]
    selectedColumns = []
  })

  it('applies once and is consumed when its own column update lands', () => {
    pendingRestore = assetSearch([{ key: 'filename' }])

    const { rerender } = render(<SavedSearchRestore elementType="asset" />)
    selectedColumns = [{ key: 'filename', locale: null }]
    rerender(<SavedSearchRestore elementType="asset" />)

    expect(applySavedSearch).toHaveBeenCalledTimes(1)
    expect(setPendingRestore).toHaveBeenCalledWith(undefined)
  })

  it('applies again after a late write clobbers the columns', () => {
    pendingRestore = assetSearch([{ key: 'filename' }])

    const { rerender } = render(<SavedSearchRestore elementType="asset" />)
    selectedColumns = [{ key: 'id', locale: null }]
    rerender(<SavedSearchRestore elementType="asset" />)

    expect(applySavedSearch).toHaveBeenCalledTimes(2)
    expect(setPendingRestore).not.toHaveBeenCalled()
  })

  it('applies the same configuration again when a host hands it back after consumption', () => {
    const configuration = assetSearch([])
    pendingRestore = configuration

    const { rerender } = render(<SavedSearchRestore elementType="asset" />)
    pendingRestore = undefined
    rerender(<SavedSearchRestore elementType="asset" />)
    pendingRestore = configuration
    rerender(<SavedSearchRestore elementType="asset" />)

    expect(applySavedSearch).toHaveBeenCalledTimes(2)
  })
})
