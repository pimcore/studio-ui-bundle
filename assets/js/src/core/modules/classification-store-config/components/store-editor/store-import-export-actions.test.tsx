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
 * already gates the screen.
 */

const STORE_ID = 7
const STORES_PATH = `/pimcore-studio/api/classification-store/configuration/stores/${STORE_ID}`

const dispatch = jest.fn()
const isAllowed = jest.fn()
const success = jest.fn()

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

// The real modal pulls antd's untranspiled ESM and an axios upload; the upload URL, the title
// and the success callback are what this surface contributes.
jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ action, onUploadSuccess, title }: any) => (
    <button
      data-action={ action }
      data-testid="import-modal"
      data-title={ title }
      onClick={ () => { onUploadSuccess({}) } }
    >
      upload
    </button>
  )
}))

jest.mock('@sdk/components', () => ({
  ButtonGroup: ({ items }: any) => <div>{items}</div>,
  Dropdown: ({ children }: any) => <div>{children}</div>,
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
    globalThis.fetch = jest.fn(async () => new Response('{}', { status: 200 })) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('offers both actions to a user holding the classification store permission', () => {
    renderActions(true)

    expect(isAllowed).toHaveBeenCalledWith(UserPermission.ClassificationStore)
    expect(screen.getByText('export')).toBeInTheDocument()
    expect(screen.getByText('import')).toBeInTheDocument()
  })

  it('offers neither action without that permission', () => {
    renderActions(false)

    expect(screen.queryByText('export')).not.toBeInTheDocument()
    expect(screen.queryByText('import')).not.toBeInTheDocument()
  })

  it('exports through the store export endpoint', async () => {
    renderActions(true)

    fireEvent.click(screen.getByText('export'))

    await waitFor(() => { expect(globalThis.fetch).toHaveBeenCalledWith(`${STORES_PATH}/export`) })
  })

  it('uploads to the store import endpoint under the classification store title', () => {
    renderActions(true)

    expect(screen.getByTestId('import-modal')).toHaveAttribute('data-action', `${STORES_PATH}/import`)
    expect(screen.getByTestId('import-modal')).toHaveAttribute('data-title', 'classification-store.import')
  })

  it('reports and invalidates what a successful import made stale', () => {
    renderActions(true)

    fireEvent.click(screen.getByTestId('import-modal'))

    expect(success).toHaveBeenCalledWith('classification-store.import-success')
    expect(dispatch).toHaveBeenCalledWith(api.util.invalidateTags(['Classification Store']))
  })
})
