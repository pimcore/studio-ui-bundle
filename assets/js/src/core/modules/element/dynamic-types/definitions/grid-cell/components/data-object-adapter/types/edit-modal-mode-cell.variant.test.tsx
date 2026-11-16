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
import { EditableCellContext } from '@Pimcore/components/grid/edit-mode/editable-cell-context'
import { EditModalCell } from './edit-modal-mode-cell'
import { type WithEditModalGridCellDefinition } from '../../../../objects/data-related/dynamic-type-object-data-abstract'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

const mockDecodeColumnIdentifier = jest.fn((): object => ({}))

jest.mock('@Pimcore/components/form/form', () => {
  const { Form: AntForm } = jest.requireActual('antd')

  return { Form: AntForm }
})

jest.mock('@Pimcore/components/flex/flex', () => ({
  Flex: ({ children }: { children: React.ReactNode }) => <div>{ children }</div>
}))

jest.mock('@Pimcore/components/modal/window-modal/window-modal', () => ({ WindowModal: () => null }))

jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ decodeColumnIdentifier: mockDecodeColumnIdentifier })
}))

jest.mock('@Pimcore/components/language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))

jest.mock('@Pimcore/modules/data-object/data-object-provider', () => ({
  DataObjectProvider: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

jest.mock('../../../../objects/data-related/components/field-collection/providers/field-collection-provider', () => ({
  FieldCollectionProvider: ({ children }: { children: React.ReactNode }) => <>{ children }</>
}))

// Exposes what the cell read from the row's api data: only its own slot may mark it inherited.
jest.mock('../inheritance-layer', () => ({
  InheritanceLayer: ({ children, inherited }: { children: React.ReactNode, inherited?: boolean }) => (
    <div data-inherited={ String(inherited) }>{ children }</div>
  )
}))

const apiEntry = (key: string, inherited: boolean): object => ({
  key,
  locale: null,
  additionalAttributes: { groupId: 3, keyId: 12 },
  inheritance: { inherited, objectId: 7 }
})

const renderCell = (variant: string | null): HTMLElement => {
  mockDecodeColumnIdentifier.mockReturnValue({
    type: 'dataobject.classificationstore',
    key: 'color',
    config: { groupId: 3, keyId: 12, variant }
  })

  const cellProps = {
    getValue: () => null,
    row: {
      index: 0,
      original: {
        id: 1,
        '__api-data': {
          columns: [apiEntry('color#Metric', true), apiEntry('color#Imperial', false), apiEntry('color', false)]
        }
      }
    },
    column: { id: 'color' },
    table: { options: { meta: { onUpdateCellData: jest.fn() } } }
  } as unknown as DefaultCellProps

  const { container } = render(
    <EditableCellContext.Provider value={ { isInEditMode: false, setIsInEditMode: jest.fn() } }>
      <EditModalCell
        cellProps={ cellProps }
        objectCellDefinition={ {
          mode: 'edit-modal',
          previewComponent: <span>preview</span>,
          editComponent: <span />,
          formItemProps: {},
          editModalSettings: { modalSize: 'M', formLayout: 'vertical' }
        } as unknown as WithEditModalGridCellDefinition }
      />
    </EditableCellContext.Provider>
  )

  return container.querySelector('[data-inherited]')!
}

describe('EditModalCell variant columns', () => {
  it('reads the entry of its own variant only', () => {
    expect(renderCell('Metric')).toHaveAttribute('data-inherited', 'true')
  })

  it('does not read the entry of another variant', () => {
    expect(renderCell('Imperial')).toHaveAttribute('data-inherited', 'false')
  })

  it('reads the unsuffixed entry for the default slot only', () => {
    expect(renderCell(null)).toHaveAttribute('data-inherited', 'false')
  })
})
