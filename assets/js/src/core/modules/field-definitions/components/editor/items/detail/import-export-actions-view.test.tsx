/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

/**
 * The presentational half of the shared actions, which a configuration screen that is not a
 * field-definitions Editor renders directly. Export fetches the artifact instead of navigating
 * an anchor, so the name the response asks for is the name the file is saved under, and a
 * refusal reaches the shared error surface rather than a browser error page.
 */

const ITEM_ID = 7
const EXPORT_URL = `/export/${ITEM_ID}`
const EXPORT_LABEL = 'export'
const IMPORT_LABEL = 'import'
const IMPORT_MODAL = 'import-modal'
const SERVER_FILENAME = 'classification-store-7-export.json'
const REFUSAL = 'Store 7 carries no identifier, so it cannot be exported.'

const dispatch = jest.fn()
const downloadFile = jest.fn()
const trackError = jest.fn()
const success = jest.fn()

// antd-style ships untranspiled ESM, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
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
  downloadFile: (...args: unknown[]) => downloadFile(...args)
}))

// The real error classes are kept - what the error surface shows is what getContent() returns -
// but they are taken from their own modules, because the index imports the handler it exports.
// The stub also keeps the handler's contract of re-throwing a GeneralError after showing it.
jest.mock('@Pimcore/modules/app/error-handler', () => {
  const apiErrorModule = jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error')
  const generalError = jest.requireActual('@Pimcore/modules/app/error-handler/classes/general-error').default

  return {
    __esModule: true,
    default: (error: unknown) => {
      trackError(error)

      if (error instanceof generalError) {
        throw new Error('re-thrown by trackError')
      }
    },
    ApiError: apiErrorModule.default,
    GeneralError: generalError,
    isApiErrorData: apiErrorModule.isApiErrorData
  }
})

// The real modal pulls antd's untranspiled ESM and an axios upload; only the success callback,
// whether the modal is open and whether it reports success itself matter here.
jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ onUploadSuccess, open, showSuccessMessage, title }: any) => (
    <button
      data-open={ String(open) }
      data-show-success-message={ String(showSuccessMessage) }
      data-testid={ IMPORT_MODAL }
      data-title={ title }
      onClick={ () => { onUploadSuccess(report) } }
    >
      upload
    </button>
  )
}))

jest.mock('@sdk/components', () => ({
  ButtonGroup: ({ items }: any) => <div>{items}</div>,
  Dropdown: ({ children }: any) => <div>{children}</div>,
  Icon: ({ value }: any) => <i>{value}</i>,
  IconTextButton: ({ children, disabled, loading, onClick }: any) => (
    <button
      data-loading={ String(loading) }
      disabled={ disabled }
      onClick={ onClick }
    >
      {children}
    </button>
  ),
  useMessage: () => ({ success })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

const { ImportExportActionsView } = jest.requireActual('./import-export-actions')
const { default: ApiError } = jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error')
const { default: GeneralError } = jest.requireActual('@Pimcore/modules/app/error-handler/classes/general-error')

// Every count the report carries, so none of them can reach the screen unnoticed.
const report = {
  created: 11,
  updated: 12,
  adopted: 13,
  matchedUnchanged: 14,
  targetOnly: 15,
  createdEntries: [],
  updatedEntries: [],
  adoptedEntries: [],
  targetOnlyEntries: [],
  conflicts: []
}

const config = {
  getExportUrl: () => EXPORT_URL,
  getImportUrl: (id: number) => `/import/${id}`,
  successMessageKey: 'classification-store.import-success'
}

const respondWith = (body: BodyInit, init: ResponseInit): void => {
  globalThis.fetch = jest.fn(async () => new Response(body, init)) as unknown as typeof fetch
}

const renderActions = (): void => {
  render(
    <ImportExportActionsView
      config={ config }
      inline
      itemId={ ITEM_ID }
    />
  )
}

const exportIsTriggered = async (): Promise<void> => {
  renderActions()

  fireEvent.click(screen.getByText(EXPORT_LABEL))

  await waitFor(() => { expect(globalThis.fetch).toHaveBeenCalledWith(EXPORT_URL) })
}

describe('import export actions view', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    dispatch.mockClear()
    downloadFile.mockClear()
    trackError.mockClear()
    success.mockClear()
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('offers both actions without a dropdown to hunt through', () => {
    renderActions()

    expect(screen.getByText(EXPORT_LABEL)).toBeInTheDocument()
    expect(screen.getByText(IMPORT_LABEL)).toBeInTheDocument()
  })

  it('saves the export under the name the response asks for', async () => {
    respondWith('{}', {
      status: 200,
      headers: { 'Content-Disposition': `attachment; filename="${SERVER_FILENAME}"` }
    })

    await exportIsTriggered()

    await waitFor(() => { expect(downloadFile).toHaveBeenCalledWith(SERVER_FILENAME, expect.anything()) })
  })

  it('still downloads under a deterministic name when the response names none', async () => {
    respondWith('{}', { status: 200 })

    await exportIsTriggered()

    await waitFor(() => { expect(downloadFile).toHaveBeenCalledWith(`export-${ITEM_ID}.json`, expect.anything()) })
  })

  it('shows a refused export through the shared error surface and downloads nothing', async () => {
    respondWith(JSON.stringify({ message: REFUSAL }), {
      status: 409,
      headers: { 'Content-Type': 'application/json' }
    })

    await exportIsTriggered()

    await waitFor(() => { expect(trackError).toHaveBeenCalled() })

    const error = trackError.mock.calls[0][0]

    expect(error).toBeInstanceOf(ApiError)
    expect(error.getContent()).toBe(REFUSAL)
    expect(downloadFile).not.toHaveBeenCalled()
  })

  it('reports a refusal whose body is not JSON as the status it came with', async () => {
    respondWith('<!DOCTYPE html><html lang="en"><body>Bad gateway</body></html>', {
      status: 502,
      headers: { 'Content-Type': 'text/html' }
    })

    await exportIsTriggered()

    await waitFor(() => { expect(trackError).toHaveBeenCalled() })

    const error = trackError.mock.calls[0][0]

    expect(error).toBeInstanceOf(ApiError)
    expect(error.getContent()).toStrictEqual({
      errorKey: 'error_response_not_json_with_status',
      params: { status: 502 }
    })
    expect(downloadFile).not.toHaveBeenCalled()
  })

  it('reports a request that never answered without rejecting the click', async () => {
    const rejections: unknown[] = []
    const record = (reason: unknown): void => { rejections.push(reason) }

    process.on('unhandledRejection', record)
    globalThis.fetch = jest.fn(async () => { throw new TypeError('Failed to fetch') }) as unknown as typeof fetch

    await exportIsTriggered()

    await waitFor(() => { expect(trackError).toHaveBeenCalled() })
    await new Promise((resolve) => setTimeout(resolve, 0))
    process.off('unhandledRejection', record)

    expect(trackError.mock.calls[0][0]).toBeInstanceOf(GeneralError)
    expect(rejections).toStrictEqual([])
  })

  it('refuses a second export while the first one is still running', async () => {
    let answer = (): void => {}

    globalThis.fetch = jest.fn(async () => await new Promise<Response>((resolve) => {
      answer = () => { resolve(new Response('{}', { status: 200 })) }
    })) as unknown as typeof fetch

    renderActions()

    const exportAction = screen.getByText(EXPORT_LABEL)

    fireEvent.click(exportAction)

    await waitFor(() => { expect(exportAction).toBeDisabled() })

    expect(exportAction).toHaveAttribute('data-loading', 'true')

    fireEvent.click(exportAction)
    answer()

    await waitFor(() => { expect(downloadFile).toHaveBeenCalledTimes(1) })

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })

  it('reports a successful import with the static message and nothing of the report', () => {
    renderActions()

    fireEvent.click(screen.getByTestId(IMPORT_MODAL))

    expect(success).toHaveBeenCalledTimes(1)
    expect(success).toHaveBeenCalledWith('classification-store.import-success')
    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-open', 'false')

    Object.values(report)
      .filter((count) => typeof count === 'number')
      .forEach((count) => { expect(screen.queryByText(String(count))).not.toBeInTheDocument() })
  })

  it('leaves the modal no second success message to report', () => {
    renderActions()

    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-show-success-message', 'false')
  })
})
