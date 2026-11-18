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
import { useGridOptions } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-many-object-relation/hooks/use-grid-options'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver', () => ({
  useDynamicTypeResolver: () => ({ hasType: () => false })
}))

// UI-only dependencies of the cell renderers, not needed for the column definitions
jest.mock('@Pimcore/components/alert/alert', () => ({ Alert: () => null }))
jest.mock('@Pimcore/components/grid/columns/default-cell', () => ({ DefaultCell: () => null }))
jest.mock('@Pimcore/components/many-to-many-relation', () => ({ getElementCellConfig: () => ({}) }))
jest.mock('@Pimcore/modules/element/dynamic-types/utils/column-helper', () => ({ DEFAULT_COLUMN_WIDTH: 150 }))

describe('useGridOptions', () => {
  // The default columns are sent as-is to POST /data-objects/grid/{classId} whenever the
  // relation's grid columns cannot be loaded (e.g. while the editor reloads or in a version
  // preview). The backend needs a type, group and config for every column - without them the
  // request failed and the editor showed an error modal.
  it('returns default visible fields that are valid grid columns', () => {
    const { result } = renderHook(() => useGridOptions())

    const columns = result.current.getDefaultVisibleFieldDefinitions()

    expect(columns.map(({ key, type, group, config }) => ({ key, type, group, config }))).toEqual([
      { key: 'id', type: 'system.id', group: ['system'], config: [] },
      { key: 'fullpath', type: 'system.string', group: ['system'], config: [] },
      { key: 'classname', type: 'system.string', group: ['system'], config: [] }
    ])
  })
})
