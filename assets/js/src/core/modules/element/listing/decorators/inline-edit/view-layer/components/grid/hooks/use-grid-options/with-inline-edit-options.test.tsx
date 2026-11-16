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
import { WithInlineEdit } from './with-inline-edit-options'
import { type IInlineEditDecoratorConfig, type IInlineEditDecoratorProps } from '../../../../../inline-edit-decorator'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'

jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useDataQueryHelper: () => ({ getArgs: () => ({}) }) })
}))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ decodeColumnIdentifier: jest.fn() })
}))
jest.mock('@Pimcore/modules/element/permissions/permission-helper', () => ({
  checkElementPermission: () => true
}))

describe('inline edit on a column the picker marked display-only', () => {
  const editableOf = (columnEditable: boolean): boolean => {
    const useBaseHook = (): ReturnType<IInlineEditDecoratorProps['useGridOptions']> => ({ getGridProps: () => ({}), transformGridColumn: () => ({ meta: {} }) }) as unknown as ReturnType<IInlineEditDecoratorProps['useGridOptions']>
    const config = { useInlineEditApiUpdate: () => ({ updateCache: jest.fn(), updateApiData: jest.fn() }) } as unknown as IInlineEditDecoratorConfig
    const { result } = renderHook(() => WithInlineEdit(useBaseHook, config)())
    const selected: Partial<SelectedColumn> = { editable: columnEditable }
    const column: any = result.current.transformGridColumn(selected as SelectedColumn)

    return column.meta.editable({ permissions: {} })
  }

  it('lets no row be edited when the column is display-only, as a repeating key is', () => {
    expect(editableOf(false)).toBe(false)
  })

  it('lets a row be edited when the column is editable', () => {
    expect(editableOf(true)).toBe(true)
  })
})
