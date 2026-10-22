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
import { render, screen } from '@testing-library/react'
import { type DataObjectAdapterCellProps, DataObjectAdapterCell } from './data-object-adapter-cell'

jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({
    hasDynamicType: () => true,
    getDynamicType: () => ({ getGridCellDefinition: () => ({ mode: 'edit-modal' }) })
  })
}))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))
jest.mock('@Pimcore/modules/auth/hooks/use-user', () => ({ useUser: () => ({ isAdmin: true }) }))
jest.mock('@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns', () => ({
  useSelectedColumns: () => ({ decodeColumnIdentifier: () => undefined })
}))
jest.mock('@Pimcore/components/grid/grid', () => ({ useEditMode: () => ({ isInEditMode: true }) }))
jest.mock('@Pimcore/components/language-selection/provider/use-language-selection', () => ({
  useLanguageSelection: () => ({ currentLanguage: 'en' })
}))
jest.mock('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/utils/resolve-field-name', () => ({
  useResolvedFieldName: () => 'shortDescription'
}))
jest.mock('./types/default-mode-cell', () => ({ DefaultModeCell: () => <span /> }))
jest.mock('./types/column-meta-cell', () => ({ ColumnMetaCell: () => <span /> }))
jest.mock('./inheritance-layer', () => ({ InheritanceLayer: () => <span /> }))
jest.mock('./types/edit-modal-mode-cell', () => {
  const { useFieldLabelTechnicalName } = jest.requireActual('@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/label/field-label-technical-name-provider')

  return {
    EditModalCell: () => <span data-testid="edit-modal">{ useFieldLabelTechnicalName() }</span>
  }
})

describe('DataObjectAdapterCell', () => {
  it('gives the field labels of the edit modal the plain field key of the column', () => {
    const cellProps = {
      column: {
        id: 'shortDescription',
        columnDef: { meta: { config: { dataObjectType: 'input', dataObjectConfig: { fieldDefinition: { name: 'shortDescription' } } } } }
      },
      row: { original: {} }
    } as unknown as DataObjectAdapterCellProps

    render(<DataObjectAdapterCell { ...cellProps } />)

    expect(screen.getByTestId('edit-modal')).toHaveTextContent('shortDescription')
  })
})
