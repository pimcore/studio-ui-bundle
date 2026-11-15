/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import trackError from '@Pimcore/modules/app/error-handler'
import { useTrackApiError } from './use-track-api-error'

// Only the ApiError class is loaded for real: the error handler itself pulls in UI
// dependencies the unit environment does not need.
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: jest.requireActual('@Pimcore/modules/app/error-handler/classes/api-error').default
}))

const trackErrorMock = trackError as jest.MockedFunction<typeof trackError>

const failure = (status: number): { status: number, data: { message: string } } => ({ status, data: { message: `error ${status}` } })

// Mirrors the container: one hook per query and mutation, so each one's failure is
// reported on its own instead of the first persistent error masking later ones.
const useBothErrors = ({ queryError, saveError }: { queryError?: unknown, saveError?: unknown }): void => {
  useTrackApiError(queryError)
  useTrackApiError(saveError)
}

describe('useTrackApiError', () => {
  beforeEach(() => { trackErrorMock.mockClear() })

  it('reports a later failure even while another one persists', () => {
    const queryError = failure(500)
    const { rerender } = renderHook(useBothErrors, { initialProps: { queryError } })
    expect(trackErrorMock).toHaveBeenCalledTimes(1)

    const saveError = failure(409)
    rerender({ queryError, saveError })

    expect(trackErrorMock).toHaveBeenCalledTimes(2)
    expect(trackErrorMock.mock.calls[1][0]).toMatchObject({ errorData: saveError })
  })

  it('does not report the same error twice', () => {
    const queryError = failure(500)
    const { rerender } = renderHook(useBothErrors, { initialProps: { queryError } })

    rerender({ queryError })

    expect(trackErrorMock).toHaveBeenCalledTimes(1)
  })

  it('reports nothing without an error', () => {
    renderHook(useBothErrors, { initialProps: {} })

    expect(trackErrorMock).not.toHaveBeenCalled()
  })
})
