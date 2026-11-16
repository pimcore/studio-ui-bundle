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
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

/**
 * The store's own export and import actions: the two endpoint URLs, the Classification Store
 * translation keys, the tag the four tab collections provide, and the single permission that
 * already gates the screen. They sit behind the footer's 'More' menu, as the class definition
 * editor's do.
 */

const STORE_ID = 7
const STORES_PATH = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}`
const EXPORT = 'export'
const IMPORT = 'import'
const IMPORT_MODAL = 'import-modal'

const dispatch = jest.fn()
const isAllowed = jest.fn()
const success = jest.fn()
const confirmImport = jest.fn(async () => true)
const useStoreReplaceWarning = jest.fn((storeId: number, enabled: boolean) => confirmImport)

// antd-style ships untranspiled ESM, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({
  isAllowed: (permission: string) => isAllowed(permission)
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => dispatch
}))

// The three Editor contexts the adapter reads: stubbed away because their providers drag the
// whole app in, and the extracted view is precisely the half that does without them.
jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => ({})
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({})
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider', () => ({
  useRefresh: () => ({ refreshLayout: jest.fn() })
}))

jest.mock('@Pimcore/modules/app/utils/download', () => ({
  downloadFile: jest.fn()
}))

// The warning has its own suite; here only that it is handed to the import as the confirmation.
jest.mock('@Pimcore/modules/classification-store-config/components/store-editor/use-store-replace-warning', () => ({
  useStoreReplaceWarning: (storeId: number, enabled: boolean) => useStoreReplaceWarning(storeId, enabled)
}))

// The real modal pulls antd's untranspiled ESM and an axios upload; the upload URL, the title
// and the success callback are what this surface contributes.
jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ action, confirmUpload, onUploadSuccess, title }: any) => (
    <button
      data-action={ action }
      data-confirmed={ confirmUpload !== undefined }
      data-testid="import-modal"
      data-title={ title }
      onClick={ () => { onUploadSuccess({}) } }
    >
      upload
    </button>
  )
}))

// The dropdown renders its menu where the test can reach it; the trigger is the 'More' button.
jest.mock('@sdk/components', () => ({
  ButtonGroup: ({ items }: any) => <div>{items}</div>,
  Dropdown: ({ children, menu }: any) => (
    <div>
      {children}
      {menu.items.map(({ key, label, onClick }: any) => (
        <button
          key={ key }
          onClick={ onClick }
        >
          {label}
        </button>
      ))}
    </div>
  ),
  Icon: ({ value }: any) => <i>{value}</i>,
  IconTextButton: ({ children, onClick }: any) => <button onClick={ onClick }>{children}</button>,
  useMessage: () => ({ success })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
// eslint-disable-next-line import/first
import { api } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
// eslint-disable-next-line import/first
import { StoreImportExportActions } from './store-import-export-actions'

const renderActions = (allowed: boolean): void => {
  isAllowed.mockReturnValue(allowed)

  render(<StoreImportExportActions storeId={ STORE_ID } />)
}

describe('StoreImportExportActions', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    dispatch.mockClear()
    isAllowed.mockClear()
    success.mockClear()
    confirmImport.mockClear()
    useStoreReplaceWarning.mockClear()
    globalThis.fetch = jest.fn(async () => new Response('{}', { status: 200 })) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('offers both actions to a user holding the classification store permission', () => {
    renderActions(true)

    expect(isAllowed).toHaveBeenCalledWith(UserPermission.ClassificationStore)
    expect(screen.getByText(EXPORT)).toBeInTheDocument()
    expect(screen.getByText(IMPORT)).toBeInTheDocument()
  })

  it('puts both behind the More menu rather than rendering them as buttons of their own', () => {
    renderActions(true)

    expect(screen.getByText('toolbar.more')).toBeInTheDocument()
  })

  it('offers neither action without that permission', () => {
    renderActions(false)

    expect(screen.queryByText(EXPORT)).not.toBeInTheDocument()
    expect(screen.queryByText(IMPORT)).not.toBeInTheDocument()
  })

  it('exports through the store export endpoint', async () => {
    renderActions(true)

    fireEvent.click(screen.getByText(EXPORT))

    await waitFor(() => { expect(globalThis.fetch).toHaveBeenCalledWith(`${STORES_PATH}/export`) })
  })

  it('gives the import the replace warning to ask before it posts', () => {
    renderActions(true)

    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-confirmed', 'true')
  })

  it('uploads to the store import endpoint under the classification store title', () => {
    renderActions(true)

    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-action', `${STORES_PATH}/import`)
    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-title', 'classification-store.import')
  })

  // the hook still mounts without the permission, so it is the one that has to ask for nothing
  it('leaves the warning to ask for no count without that permission', () => {
    renderActions(false)

    expect(useStoreReplaceWarning).toHaveBeenCalledWith(STORE_ID, false)
  })

  it('lets the warning count what the store holds for a user holding the permission', () => {
    renderActions(true)

    expect(useStoreReplaceWarning).toHaveBeenCalledWith(STORE_ID, true)
  })

  it('reports and invalidates what a successful import made stale', () => {
    renderActions(true)

    fireEvent.click(screen.getByTestId(IMPORT_MODAL))

    expect(success).toHaveBeenCalledWith('classification-store.import-success')
    expect(dispatch).toHaveBeenCalledWith(api.util.invalidateTags(['Classification Store']))
  })
})
