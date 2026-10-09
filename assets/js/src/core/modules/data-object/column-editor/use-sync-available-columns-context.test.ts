/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const setAvailableColumns = jest.fn()

jest.mock(
  '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns',
  () => ({ useAvailableColumns: () => ({ setAvailableColumns }) })
)

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
// eslint-disable-next-line import/first
import { useSyncAvailableColumnsContext } from './use-sync-available-columns-context'

const field = { key: 'name', type: 'dataobject.adapter' } as unknown as GridColumnConfiguration

describe('useSyncAvailableColumnsContext', () => {
  beforeEach(() => { setAvailableColumns.mockClear() })

  it('publishes the available columns', () => {
    renderHook(() => { useSyncAvailableColumnsContext([field]) })

    expect(setAvailableColumns).toHaveBeenCalledWith([field])
  })

  it('replaces a previous class\'s columns when the next result is empty, once per change', () => {
    const empty: GridColumnConfiguration[] = []
    const { rerender } = renderHook(
      ({ fields }) => { useSyncAvailableColumnsContext(fields) },
      { initialProps: { fields: [field] } }
    )

    rerender({ fields: empty })
    rerender({ fields: empty })

    expect(setAvailableColumns).toHaveBeenCalledTimes(2)
    expect(setAvailableColumns).toHaveBeenLastCalledWith(empty)
  })
})
