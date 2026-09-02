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
import { fireEvent, render, screen } from '@testing-library/react'
import { type CellContext } from '@tanstack/react-table'
import { ActionsCell } from './actions-cell'
import { type QuantityValueUnitRow } from '../hooks/use-quantity-value-unit'

const confirmMock = jest.fn()
const deleteUnitByIdMock = jest.fn()

// The @sdk/components barrel pulls the whole app (and untranspiled antd-style) in with
// it. Only the three members used by the cell are needed, so they are replaced by plain
// elements plus a spy on the confirmation modal.
jest.mock('@sdk/components', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  IconButton: ({ onClick, loading }: { onClick: () => void, loading: boolean }) => (
    <button
      data-testid='delete-button'
      disabled={ loading }
      onClick={ onClick }
      type='button'
    >
      delete
    </button>
  ),
  useFormModal: () => ({ confirm: confirmMock })
}))

jest.mock('../hooks/use-quantity-value-unit', () => ({
  useQuantityValueUnit: () => ({ deleteUnitById: deleteUnitByIdMock, deleteLoading: false })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

type CellInfo = Parameters<typeof ActionsCell>[0]['info']

const getInfo = (id: string | null): CellInfo => ({
  row: { original: { id } }
} as unknown as CellInfo)

const rows = [
  { id: 'mm', rowId: 'row-mm' },
  { id: 'kg', rowId: 'row-kg' }
] as unknown as QuantityValueUnitRow[]

const getConfirmOptions = (): { title: string, content: string, okText: string, onOk: () => Promise<void> } => {
  expect(confirmMock).toHaveBeenCalledTimes(1)

  return confirmMock.mock.calls[0][0]
}

describe('quantity value unit ActionsCell', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    deleteUnitByIdMock.mockResolvedValue({ success: true })
  })

  const renderCell = (id: string | null = 'mm'): jest.Mock => {
    const setQuantityValueUnitRows = jest.fn()

    render(
      <ActionsCell
        info={ getInfo(id) as CellContext<any, React.ReactNode> }
        setQuantityValueUnitRows={ setQuantityValueUnitRows }
      />
    )

    return setQuantityValueUnitRows
  }

  it('asks for confirmation before deleting a unit', () => {
    renderCell()

    fireEvent.click(screen.getByTestId('delete-button'))

    const options = getConfirmOptions()
    expect(options.title).toBe('warning')
    expect(options.content).toBe('quantity-values.delete-confirmation')
    expect(options.okText).toBe('delete')
    expect(deleteUnitByIdMock).not.toHaveBeenCalled()
  })

  it('deletes the unit and removes its row once the deletion is confirmed', async () => {
    const setQuantityValueUnitRows = renderCell()

    fireEvent.click(screen.getByTestId('delete-button'))
    await getConfirmOptions().onOk()

    expect(deleteUnitByIdMock).toHaveBeenCalledWith('mm')
    expect(setQuantityValueUnitRows).toHaveBeenCalledTimes(1)

    const updateRows = setQuantityValueUnitRows.mock.calls[0][0] as (prev: QuantityValueUnitRow[]) => QuantityValueUnitRow[]
    expect(updateRows(rows)).toEqual([{ id: 'kg', rowId: 'row-kg' }])
  })

  it('keeps the row when the confirmed deletion fails', async () => {
    deleteUnitByIdMock.mockResolvedValue({ success: false })
    const setQuantityValueUnitRows = renderCell()

    fireEvent.click(screen.getByTestId('delete-button'))
    await getConfirmOptions().onOk()

    expect(deleteUnitByIdMock).toHaveBeenCalledWith('mm')
    expect(setQuantityValueUnitRows).not.toHaveBeenCalled()
  })

  it('does nothing for a row without an id', () => {
    renderCell(null)

    fireEvent.click(screen.getByTestId('delete-button'))

    expect(confirmMock).not.toHaveBeenCalled()
    expect(deleteUnitByIdMock).not.toHaveBeenCalled()
  })
})
