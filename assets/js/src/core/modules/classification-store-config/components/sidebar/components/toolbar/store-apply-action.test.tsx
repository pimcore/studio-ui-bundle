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

/**
 * The store-less import action of the sidebar toolbar: gated by the one permission that gates the
 * screen, uploading to the apply endpoint, and refreshing the store list after a success.
 */

const APPLY_PATH = '/pimcore-studio/api/classification-store/configuration/stores/apply'

const dispatch = jest.fn()
const isAllowed = jest.fn()
const success = jest.fn()

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

// The real modal pulls antd's untranspiled ESM and an axios upload; the upload URL and the success callback are what this surface contributes.
jest.mock('@Pimcore/components/import-modal/import-modal', () => ({
  ImportModal: ({ action, onUploadSuccess, fileKey }: any) => (
    <button
      data-action={ action }
      data-filekey={ fileKey }
      data-testid="import-modal"
      onClick={ () => { onUploadSuccess({}) } }
    >
      upload
    </button>
  )
}))

jest.mock('@Pimcore/components/icon-button/icon-button', () => ({
  IconButton: ({ onClick, tooltip, ...rest }: any) => (
    <button
      aria-label={ rest['aria-label'] }
      data-tooltip={ tooltip?.title }
      onClick={ onClick }
    />
  )
}))

// The URL builder lives beside the store's own export/import builders, whose module reaches the
// editor providers: stubbed away because they drag the whole app in.
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
import { StoreApplyAction } from './store-apply-action'

const renderAction = (allowed: boolean): void => {
  isAllowed.mockReturnValue(allowed)

  render(<StoreApplyAction />)
}

describe('StoreApplyAction', () => {
  beforeEach(() => {
    dispatch.mockClear()
    isAllowed.mockClear()
    success.mockClear()
  })

  it('offers the import to a user holding the classification store permission', () => {
    renderAction(true)

    expect(isAllowed).toHaveBeenCalledWith(UserPermission.ClassificationStore)
    expect(screen.getByRole('button', { name: 'classification-store.apply' })).toHaveAttribute('data-tooltip', 'classification-store.apply')
    expect(screen.getByTestId('import-modal')).toBeInTheDocument()
  })

  it('renders nothing without that permission', () => {
    renderAction(false)

    expect(screen.queryByRole('button', { name: 'classification-store.apply' })).not.toBeInTheDocument()
    expect(screen.queryByTestId('import-modal')).not.toBeInTheDocument()
  })

  it('uploads to the apply endpoint, which names no store, under the default part name', () => {
    renderAction(true)

    expect(screen.getByTestId('import-modal')).toHaveAttribute('data-action', APPLY_PATH)
    expect(screen.getByTestId('import-modal')).not.toHaveAttribute('data-filekey')
  })

  it('reports once and refreshes the store list after a successful apply', () => {
    renderAction(true)

    fireEvent.click(screen.getByTestId('import-modal'))

    expect(success).toHaveBeenCalledTimes(1)
    expect(success).toHaveBeenCalledWith('classification-store.import-success')
    expect(dispatch).toHaveBeenCalledWith(api.util.invalidateTags(['Classification Store']))
  })
})
