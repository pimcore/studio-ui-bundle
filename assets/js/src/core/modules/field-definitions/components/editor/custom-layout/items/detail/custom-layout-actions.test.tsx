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
 * The custom-layout editors of a class and of an object brick are the two surfaces that carried
 * their own export and import: an anchor navigation whose refusal landed on a browser error page,
 * and an import toast beside the modal's own. They now render the shared view, so a refusal
 * reaches the shared error surface and only one success toast is reported — with Delete, which is
 * this surface's own action, still offered.
 */

const ITEM_ID = 'a-custom-layout-uuid'
const EXPORT_URL = `/class/custom-layout/export/${ITEM_ID}`
const REFUSAL = 'That custom layout cannot be exported.'

const confirm = jest.fn()
const downloadFile = jest.fn()
const success = jest.fn()
const trackError = jest.fn()
const refreshLayout = jest.fn()

// antd-style ships untranspiled ESM, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => jest.fn()
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/settings-provider', () => ({
  useSettings: () => ({
    importExportConfig: {
      getExportUrl: () => EXPORT_URL,
      getImportUrl: (id: string) => `/import/${id}`
    },
    useItemsDeleteMutation: () => [jest.fn(), { isLoading: false }]
  })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/provider', () => ({
  useItems: () => ({ activeConfiguration: { id: ITEM_ID }, closeConfiguration: jest.fn() })
}))

jest.mock('@Pimcore/modules/field-definitions/components/editor/items/detail/refresh-provider', () => ({
  useRefresh: () => ({ refreshLayout })
}))

jest.mock('@Pimcore/modules/app/utils/download', () => ({
  downloadFile: (...args: unknown[]) => downloadFile(...args)
}))

jest.mock('@Pimcore/modules/app/error-handler', () => {
  const apiErrorModule = jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error')

  return {
    __esModule: true,
    default: (error: unknown) => trackError(error),
    ApiError: apiErrorModule.default,
    GeneralError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/general-error').default,
    isApiErrorData: apiErrorModule.isApiErrorData
  }
})

jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ onUploadSuccess, showSuccessMessage }: any) => (
    <button
      data-show-success-message={ String(showSuccessMessage) }
      data-testid="import-modal"
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
  IconTextButton: ({ children, disabled, onClick }: any) => (
    <button
      disabled={ disabled }
      onClick={ onClick }
    >
      {children}
    </button>
  ),
  useMessage: () => ({ success }),
  useFormModal: () => ({ confirm })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import { CustomLayoutActions } from './custom-layout-actions'
// eslint-disable-next-line import/first
import ApiError from '@Pimcore/modules/app/error-handler/classes/api-error'

describe('CustomLayoutActions', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    confirm.mockClear()
    downloadFile.mockClear()
    success.mockClear()
    trackError.mockClear()
    refreshLayout.mockClear()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('still offers Delete beside export and import', () => {
    render(<CustomLayoutActions />)

    expect(screen.getByText('export')).toBeInTheDocument()
    expect(screen.getByText('import')).toBeInTheDocument()

    fireEvent.click(screen.getByText('delete'))

    expect(confirm).toHaveBeenCalledTimes(1)
  })

  it('shows a refused export through the shared error surface instead of navigating to it', async () => {
    globalThis.fetch = jest.fn(async () => new Response(
      JSON.stringify({ message: REFUSAL }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    )) as unknown as typeof fetch

    render(<CustomLayoutActions />)

    fireEvent.click(screen.getByText('export'))

    await waitFor(() => { expect(globalThis.fetch).toHaveBeenCalledWith(EXPORT_URL) })
    await waitFor(() => { expect(trackError).toHaveBeenCalled() })

    expect(trackError.mock.calls[0][0]).toBeInstanceOf(ApiError)
    expect(trackError.mock.calls[0][0].getContent()).toBe(REFUSAL)
    expect(downloadFile).not.toHaveBeenCalled()
  })

  it('reports one success toast for an import and leaves the modal none to add', () => {
    render(<CustomLayoutActions />)

    expect(screen.getByTestId('import-modal')).toHaveAttribute('data-show-success-message', 'false')

    fireEvent.click(screen.getByTestId('import-modal'))

    expect(success).toHaveBeenCalledTimes(1)
    expect(success).toHaveBeenCalledWith('class-definition.import-success')
    expect(refreshLayout).toHaveBeenCalledTimes(1)
  })
})
