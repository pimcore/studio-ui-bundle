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

const getGridCellComponent = jest.fn((props: any) => <span data-testid='cell'>{ String(props.getValue()) }</span>)

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ hasDynamicType: () => true, getDynamicType: () => ({ getGridCellComponent }) })
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/components/alert/alert', () => ({ Alert: () => null }))

const { DefaultModeCell } = jest.requireActual('./default-mode-cell')

const renderCell = (fieldDefinition: object, value: unknown): ReturnType<typeof render> => {
  const cellProps: any = {
    getValue: () => value,
    column: { columnDef: { meta: { config: { dataObjectConfig: { fieldDefinition } } } } }
  }

  return render(<DefaultModeCell
    cellProps={ cellProps }
    objectCellDefinition={ { mode: 'default', type: 'string' } }
                />)
}

describe('DefaultModeCell for a multiValue key', () => {
  const definition = { fieldtype: 'multiValue', delegateDatatype: 'input', multiValue: true }

  it('shows the stored values in order as text, not the entry list', () => {
    const { getByTestId } = renderCell(definition, [{ v: 'b', p: 1 }, { v: 'a', p: 0 }, { v: 3, p: 2 }])

    expect(getByTestId('cell')).toHaveTextContent('a, b, 3')
  })

  it('shows an empty list as nothing', () => {
    expect(renderCell(definition, []).getByTestId('cell')).toHaveTextContent('')
  })

  it('passes the value of any other field type on untouched', () => {
    expect(renderCell({ fieldtype: 'input' }, 'plain').getByTestId('cell')).toHaveTextContent('plain')
  })
})
