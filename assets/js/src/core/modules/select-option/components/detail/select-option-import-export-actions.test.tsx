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
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

const SELECT_OPTION_ID = 'Colors'
const SELECT_OPTION_PATH = `/pimcore-studio/api/class/select-option/${SELECT_OPTION_ID}`
const EXPORT = 'export'
const IMPORT = 'import'
const IMPORT_MODAL = 'import-modal'

const dispatch = jest.fn()
const success = jest.fn()

// antd-style ships untranspiled ESM, which jest does not transform.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

jest.mock('@Pimcore/app/api/pimcore/route', () => ({ getPrefix: () => '/pimcore-studio/api' }))

jest.mock('@Pimcore/app/store', () => ({
  useAppDispatch: () => dispatch,
  injectSliceWithState: jest.fn()
}))

jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  api: { util: { invalidateTags: (tags: unknown) => ({ type: 'api/invalidateTags', payload: tags }) } }
}))

// The Editor contexts the shared module also reads; their providers drag the whole app in.
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

// The real modal pulls antd's untranspiled ESM and an axios upload.
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

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

const { SelectOptionImportExportActions } = jest.requireActual('./select-option-import-export-actions')

const renderActions = (): { onImported: jest.Mock } => {
  const onImported = jest.fn()

  render(
    <SelectOptionImportExportActions
      id={ SELECT_OPTION_ID }
      onImported={ onImported }
    />
  )

  return { onImported }
}

describe('SelectOptionImportExportActions', () => {
  const originalFetch = globalThis.fetch

  beforeEach(() => {
    dispatch.mockClear()
    success.mockClear()
    globalThis.fetch = jest.fn(async () => new Response('{}', { status: 200 })) as unknown as typeof fetch
  })

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('puts export and import behind the More menu, as the class definition editor does', () => {
    renderActions()

    expect(screen.getByText('toolbar.more')).toBeInTheDocument()
    expect(screen.getByText(EXPORT)).toBeInTheDocument()
    expect(screen.getByText(IMPORT)).toBeInTheDocument()
  })

  it('exports the open select option through its export endpoint', async () => {
    renderActions()

    fireEvent.click(screen.getByText(EXPORT))

    await waitFor(() => { expect(globalThis.fetch).toHaveBeenCalledWith(`${SELECT_OPTION_PATH}/export`) })
  })

  it('uploads the import to the open select option under the select option title', () => {
    renderActions()

    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-action', `${SELECT_OPTION_PATH}/import`)
    expect(screen.getByTestId(IMPORT_MODAL)).toHaveAttribute('data-title', 'select-option.import.title')
  })

  it('refreshes the tree and the editor after an import', () => {
    const { onImported } = renderActions()

    fireEvent.click(screen.getByTestId(IMPORT_MODAL))

    expect(success).toHaveBeenCalledWith('select-option.import.success')
    expect(onImported).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({ type: 'api/invalidateTags', payload: ['SELECT_OPTION_COLLECTION'] })
  })
})
