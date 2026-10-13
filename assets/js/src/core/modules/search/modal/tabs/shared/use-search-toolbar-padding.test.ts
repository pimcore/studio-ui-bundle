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
import { useSearchToolbarPadding } from './use-search-toolbar-padding'

let mockIsOpen = false

jest.mock('@Pimcore/modules/search/provider/use-search', () => ({
  useSearch: () => ({ isOpen: mockIsOpen })
}))

describe('useSearchToolbarPadding', () => {
  it('drops the horizontal padding inside the search modal, whose body supplies the gutter', () => {
    mockIsOpen = true

    const { result } = renderHook(() => useSearchToolbarPadding())

    expect(result.current).toEqual({ left: 'none', right: 'none' })
  })

  it('keeps the default padding when the listing is hosted as a saved-search tab', () => {
    mockIsOpen = false

    const { result } = renderHook(() => useSearchToolbarPadding())

    expect(result.current).toBeUndefined()
  })
})
