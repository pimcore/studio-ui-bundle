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
import { MultiSelectCell } from './multi-select-cell'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

const selectProps: Array<Record<string, unknown>> = []

jest.mock('@Pimcore/components/select/select', () => {
  const { forwardRef } = jest.requireActual('react')
  return {
    Select: forwardRef((props: Record<string, unknown>, _ref: unknown) => {
      selectProps.push(props)
      return null
    })
  }
})

jest.mock('@Pimcore/components/tag/tag', () => ({ Tag: () => null }))
jest.mock('@Pimcore/components/spin/spin', () => ({ Spin: () => null }))
jest.mock('./multi-select-cell.styles', () => ({ useStyles: () => ({ styles: {} }) }))
// The real select-options utils pull in the i18n/store graph (untranspiled ESM deps).
jest.mock('../../utils/select-options', () => ({
  resolveOptions: (config: { options?: unknown[] }) => ({ isLoading: false, options: config.options ?? [] }),
  stringifyOptionValue: (value: unknown) => (value === null || value === undefined ? undefined : String(value))
}))
jest.mock('@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode', () => ({
  META_SUPPORTS_BATCH_APPEND_MODE: 'supportsBatchAppendMode'
}))
jest.mock('@Pimcore/components/grid/edit-mode/use-edit-mode', () => ({
  useEditMode: () => ({ isInEditMode: true, disableEditMode: jest.fn(), fireOnUpdateCellDataEvent: jest.fn() })
}))

const renderCell = (config: Record<string, unknown>): Record<string, unknown> => {
  selectProps.length = 0
  const props = {
    column: { columnDef: { meta: { config, columnKey: 'colors' } } },
    getValue: () => ['red'],
    row: { original: { id: 1 } }
  } as unknown as DefaultCellProps
  render(<MultiSelectCell { ...props } />)
  return selectProps[selectProps.length - 1]
}

const options = [{ label: 'Red', value: 'red' }, { label: 'Blue', value: 'blue' }]

describe('MultiSelectCell', () => {
  it('limits the selection to the configured maxItems', () => {
    expect(renderCell({ options, maxItems: 2 }).maxCount).toBe(2)
  })

  it('does not limit the selection without maxItems', () => {
    expect(renderCell({ options }).maxCount).toBeUndefined()
  })
})
