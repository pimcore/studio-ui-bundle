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
  const definition = { fieldtype: 'multiValue', delegateDatatype: 'input' }

  // A slot column holds one value, which the cell shows as the delegate type would.
  it('passes the slot value on untouched', () => {
    expect(renderCell(definition, 'a').getByTestId('cell')).toHaveTextContent('a')
  })

  it('hands the cell the delegate definition in place of the wrapper', () => {
    renderCell(definition, 'a')

    expect(getGridCellComponent.mock.calls[getGridCellComponent.mock.calls.length - 1][0].column.columnDef.meta.config)
      .toMatchObject({ fieldtype: 'input' })
  })

  it('passes the value of any other field type on untouched', () => {
    expect(renderCell({ fieldtype: 'input' }, 'plain').getByTestId('cell')).toHaveTextContent('plain')
  })
})
