/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({ hasType: () => true })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/utils/column-helper', () => ({
  DEFAULT_COLUMN_WIDTH: 150
}))

jest.mock('@Pimcore/components/many-to-many-relation', () => ({
  getElementCellConfig: () => ({})
}))

jest.mock('@Pimcore/components/alert/alert', () => ({
  Alert: () => null
}))

jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({
  DefaultCell: () => null
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useGridOptions } from './use-grid-options'
// eslint-disable-next-line import/first
import { type VisibleFieldDefinition } from '../many-to-many-object-relation'

const column = (key: string, group: string[], frontendType: string = 'input'): VisibleFieldDefinition => ({
  additionalAttributes: {},
  config: [],
  editable: false,
  exportable: false,
  filterable: false,
  frontendType,
  group,
  key,
  locale: null,
  localizable: false,
  sortable: false,
  title: key,
  type: 'dataobject.adapter'
})

describe('useGridOptions().transformGridColumn', () => {
  const { result } = renderHook(() => useGridOptions())
  const { transformGridColumn } = result.current

  it('keeps the fixed sizes of the system columns', () => {
    expect(transformGridColumn(column('id', ['system']), false).size).toBe(100)
    expect(transformGridColumn(column('fullpath', ['system']), false).size).toBe(200)
    expect(transformGridColumn(column('classname', ['system']), false).size).toBe(200)
  })

  it('leaves the size of data columns to the grid, which resolves it from the dynamic type', () => {
    // A fixed size here would override the type default, e.g. the narrow
    // checkbox column width the data-object listing uses.
    expect(transformGridColumn(column('week01', ['fields'], 'checkbox'), false).size).toBeUndefined()
    expect(transformGridColumn(column('name', ['fields'], 'input'), false).size).toBeUndefined()
  })
})
