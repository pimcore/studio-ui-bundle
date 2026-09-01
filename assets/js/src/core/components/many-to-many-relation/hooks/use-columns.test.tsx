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
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: (): null => null
}))
jest.mock('@Pimcore/components/box/box', () => ({
  Box: (): null => null
}))
jest.mock('@Pimcore/components/button-group/button-group', () => ({
  ButtonGroup: (): null => null
}))
jest.mock('@Pimcore/modules/asset/actions/download/use-download', () => ({
  useDownload: () => ({ download: jest.fn() })
}))
jest.mock('@Pimcore/components/modal/form-modal/hooks/use-form-modal', () => ({
  useFormModal: () => ({ confirm: jest.fn() })
}))
jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: jest.fn(), mapToElementType: (type: string) => type })
}))
jest.mock('../utils/helpers', () => ({
  getElementCellConfig: () => ({})
}))
jest.mock('../utils/full-path-cell-renderer', () => ({
  renderFullPathCell: (): null => null
}))
// The barrel pulls in .styles.ts files whose antd-style dependency is untranspiled ESM,
// which jest cannot parse; a getFilterColumn without results keeps every column unchanged.
jest.mock('@Pimcore/components/many-to-many-relation', () => ({
  ColumnHeaderFilter: (): null => null,
  useRelationFilterColumns: () => ({ getFilterColumn: () => undefined })
}))

// eslint-disable-next-line import/first
import { type ReactElement } from 'react'
// eslint-disable-next-line import/first
import { useColumns } from './use-columns'
// eslint-disable-next-line import/first
import { type DisplayManyToManyRelationValueItem } from './use-value'

const getActionButtonKeys = (
  item: Partial<DisplayManyToManyRelationValueItem>,
  props: Record<string, unknown> = {}
): Array<string | null> => {
  const hookProps: Record<string, unknown> = { deleteItem: jest.fn(), ...props }
  const { columns } = useColumns(hookProps as never)

  const actionsColumn = columns[columns.length - 1] as { cell: (info: unknown) => ReactElement }
  const cell = actionsColumn.cell({ row: { index: 0, original: item } })

  const buttonGroup = cell.props.children as ReactElement<{ items: ReactElement[] }>
  return buttonGroup.props.items.map((button) => button.key)
}

const item: Partial<DisplayManyToManyRelationValueItem> = {
  id: 1,
  type: 'object',
  subtype: 'Product',
  fullPath: '/path/to/element',
  isPublished: true
}

describe('useColumns action buttons', () => {
  it('shows the open button when hasViewAccess is not set', () => {
    expect(getActionButtonKeys(item)).toContain('open')
  })

  it('shows the open button when hasViewAccess is true', () => {
    expect(getActionButtonKeys({ ...item, hasViewAccess: true })).toContain('open')
  })

  it('hides the open button when hasViewAccess is false', () => {
    expect(getActionButtonKeys({ ...item, hasViewAccess: false })).not.toContain('open')
  })

  it('keeps the remove button independent of hasViewAccess', () => {
    expect(getActionButtonKeys({ ...item, hasViewAccess: false })).toContain('remove')
  })

  it('hides the remove button when the field is disabled', () => {
    expect(getActionButtonKeys(item, { disabled: true })).not.toContain('remove')
  })
})
