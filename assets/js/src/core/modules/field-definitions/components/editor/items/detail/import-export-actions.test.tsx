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
import { render, screen, fireEvent } from '@testing-library/react'

// An import changes the same field definitions a save does, but it never goes through an
// RTK Query mutation: ImportModal posts the file straight to the upload URL. So nothing
// invalidated the cache for it, and an open data object grid kept the columns it was
// opened with until a full page reload - the symptom this editor shares with a class save.

const ITEM_ID = 'Product'

let importExportConfig: Record<string, unknown> | undefined
const dispatch = jest.fn()
const refreshLayout = jest.fn()

jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => ({ importExportConfig })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({ activeConfiguration: { id: ITEM_ID } })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider', () => ({
  useRefresh: () => ({ refreshLayout })
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => dispatch
}))

// The real modal pulls antd's untranspiled ESM and an axios upload; the success callback
// is the whole of what this component contributes, so the stand-in just fires it.
jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ onUploadSuccess }: any) => (
    <button
      data-testid="upload-success"
      onClick={ onUploadSuccess }
    >
      upload
    </button>
  )
}))

jest.mock('@sdk/components', () => ({
  Dropdown: ({ children }: any) => <div>{children}</div>,
  Icon: ({ value }: any) => <i>{value}</i>,
  IconTextButton: ({ children }: any) => <button>{children}</button>,
  useMessage: () => ({ success: jest.fn() })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const { ImportExportActions } = jest.requireActual('./import-export-actions')

const uploadSucceeds = (): void => {
  render(<ImportExportActions />)
  fireEvent.click(screen.getByTestId('upload-success'))
}

describe('import export actions', () => {
  beforeEach(() => {
    dispatch.mockClear()
    refreshLayout.mockClear()
  })

  it('invalidates what the import made stale', () => {
    const action = { type: 'api/invalidateTags', payload: ['DATA_OBJECT_GRID_COLUMNS'] }
    const getImportInvalidation = jest.fn(() => action)
    importExportConfig = {
      getExportUrl: () => '/export',
      getImportUrl: () => '/import',
      getImportInvalidation
    }

    uploadSucceeds()

    expect(getImportInvalidation).toHaveBeenCalledWith(ITEM_ID)
    expect(dispatch).toHaveBeenCalledWith(action)
  })

  it('refreshes the editor whether or not anything is invalidated', () => {
    importExportConfig = { getExportUrl: () => '/export', getImportUrl: () => '/import' }

    uploadSucceeds()

    expect(refreshLayout).toHaveBeenCalled()
    expect(dispatch).not.toHaveBeenCalled()
  })
})
