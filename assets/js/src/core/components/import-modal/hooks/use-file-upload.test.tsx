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
import { act, render, renderHook } from '@testing-library/react'

/**
 * A refused import reports no success and shows the server's refusal verbatim: the server's own
 * wording is what distinguishes the two conflicts the store import endpoint defines from an
 * unparseable file, and what names the conflicting entries. The error the upload builds and the
 * surface that renders it are driven over the same fixtures, so the two cannot drift apart.
 */

const trackError = jest.fn()

jest.mock('axios', () => ({
  post: jest.fn()
}))

// The real ApiError is kept, taken from its own module because the index imports the handler
// it exports and spreading it would pull that cycle in.
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: (error: unknown) => trackError(error),
  ApiError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error').default
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// eslint-disable-next-line import/first
import axios from 'axios'
// eslint-disable-next-line import/first
import { ApiError } from '@Pimcore/modules/app/error-handler'
// eslint-disable-next-line import/first
import { ApiErrorViewUI } from '@Pimcore/modules/app/error-handler/components/api-error-view-ui'
// eslint-disable-next-line import/first
import { useFileUpload } from './use-file-upload'

const ACTION = '/pimcore-studio/api/classification-store/configuration/stores/7/import'

const refusals = [
  { status: 409, message: 'The file describes store "Technical" and this is store "Marketing".' },
  { status: 409, message: 'The configuration could not be applied and was rolled back: group "size", key "width".' },
  { status: 422, message: 'The file is not a store configuration artifact.' },
  // A store name is entered text and can look like markup. Verbatim means the name reads as the
  // name: the refusal must not render the tags a user typed into it.
  { status: 409, message: 'The file describes store "<b>Technical</b>" and this is store "Marketing".' }
]

const onUploadSuccess = jest.fn()

const uploadIsRefused = async (status: number, message: string): Promise<void> => {
  (axios.post as jest.Mock).mockRejectedValue({ response: { status, data: { message } } })

  const { result } = renderHook(() => useFileUpload({ action: ACTION, onUploadSuccess }))

  await act(async () => {
    await expect(result.current.upload(new File(['{}'], 'store.json'))).rejects.toBeDefined()
  })
}

describe('a refused import', () => {
  beforeEach(() => {
    trackError.mockClear()
    onUploadSuccess.mockClear()
  })

  it.each(refusals)('reports no success and keeps the server wording on $status', async ({ status, message }) => {
    await uploadIsRefused(status, message)

    expect(onUploadSuccess).not.toHaveBeenCalled()
    expect(trackError).toHaveBeenCalledTimes(1)

    const error = trackError.mock.calls[0][0]

    expect(error).toBeInstanceOf(ApiError)
    expect(error.getContent()).toBe(message)
  })

  it.each(refusals)('renders the server wording unaltered for $status', async ({ status, message }) => {
    await uploadIsRefused(status, message)

    const { container } = render(<ApiErrorViewUI errorContent={ trackError.mock.calls[0][0].getContent() } />)

    expect(container.textContent).toBe(message)
    expect(container.querySelector('b')).toBeNull()
  })
})
