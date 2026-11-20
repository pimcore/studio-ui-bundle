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
import { fireEvent, render, screen } from '@testing-library/react'

const SELECT_OPTION_ID = 'Colors'

const dispatch = jest.fn()
const success = jest.fn()

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))
jest.mock('@Pimcore/app/api/pimcore/route', () => ({ getPrefix: () => '/pimcore-studio/api' }))
jest.mock('@Pimcore/app/store', () => ({ useAppDispatch: () => dispatch }))
jest.mock('@Pimcore/components/message/useMessage', () => ({ useMessage: () => ({ success }) }))
jest.mock('@Pimcore/modules/class-definition/class-definition-slice-enhanced', () => ({
  api: { util: { invalidateTags: (tags: unknown) => ({ type: 'api/invalidateTags', payload: tags }) } }
}))
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ disabled, onClick, tooltip, 'aria-label': ariaLabel }: any) => (
    <button
      aria-label={ ariaLabel }
      disabled={ disabled }
      onClick={ onClick }
      title={ tooltip?.title }
    />
  )
}))

// The real modal pulls antd's untranspiled ESM and an axios upload; the stand-in shows where it
// would post and fires the success callback.
jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ action, onUploadSuccess, open }: any) => (
    <button
      data-action={ action }
      data-open={ String(open) }
      data-testid="upload-success"
      onClick={ onUploadSuccess }
    >
      upload
    </button>
  )
}))

const { SelectOptionImportExportActions } = jest.requireActual('./select-option-import-export-actions')

const renderActions = (props: Record<string, unknown> = {}): { onImportSuccess: jest.Mock } => {
  const onImportSuccess = jest.fn(async () => { await Promise.resolve() })

  render(
    <SelectOptionImportExportActions
      id={ SELECT_OPTION_ID }
      isWriteable
      onImportSuccess={ onImportSuccess }
      { ...props }
    />
  )

  return { onImportSuccess }
}

describe('SelectOptionImportExportActions', () => {
  beforeEach(() => {
    dispatch.mockClear()
    success.mockClear()
  })

  it('downloads the export of the open select option', () => {
    const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      expect(this.getAttribute('href')).toBe(`/pimcore-studio/api/class/select-option/${SELECT_OPTION_ID}/export`)
    })

    renderActions()
    fireEvent.click(screen.getByRole('button', { name: 'export' }))

    expect(click).toHaveBeenCalledTimes(1)
    click.mockRestore()
  })

  it('uploads the import to the open select option', () => {
    renderActions()

    expect(screen.getByTestId('upload-success').getAttribute('data-action'))
      .toBe(`/pimcore-studio/api/class/select-option/${SELECT_OPTION_ID}/import`)

    fireEvent.click(screen.getByRole('button', { name: 'import' }))

    expect(screen.getByTestId('upload-success').getAttribute('data-open')).toBe('true')
  })

  it('does not offer the import where saving is not allowed', () => {
    renderActions({ isWriteable: false })

    const importButton = screen.getByRole('button', { name: 'import' })
    expect(importButton).toBeDisabled()
    expect(importButton.getAttribute('title')).toBe('config_not_writeable')
    expect(screen.getByRole('button', { name: 'export' })).toBeEnabled()
  })

  it('does not offer the import while the editor is busy', () => {
    renderActions({ disabled: true })

    expect(screen.getByRole('button', { name: 'import' })).toBeDisabled()
  })

  it('refreshes the tree and the editor after an import', () => {
    const { onImportSuccess } = renderActions()

    fireEvent.click(screen.getByTestId('upload-success'))

    expect(dispatch).toHaveBeenCalledWith({ type: 'api/invalidateTags', payload: ['SELECT_OPTION_COLLECTION'] })
    expect(onImportSuccess).toHaveBeenCalledTimes(1)
    expect(success).toHaveBeenCalledWith('select-option.import.success')
  })
})
