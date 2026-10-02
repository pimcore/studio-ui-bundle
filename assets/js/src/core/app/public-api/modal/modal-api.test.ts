/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isInIframe } from '@Pimcore/utils/iframe'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { API_GATEWAY_EVENT } from '@Pimcore/app/public-api/api-gateway/api-gateway-event'
import { ApiGatewayEventType } from '@Pimcore/app/public-api/api-gateway/types/event-types'
import { modalApi } from './modal-api'

jest.mock('@Pimcore/utils/iframe')
jest.mock('@Pimcore/app/public-api/helpers/api-helper')

describe('modalApi.openCustom', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('dispatches an openCustomModal gateway event on window when not in an iframe', () => {
    jest.mocked(isInIframe).mockReturnValue(false)
    const listener = jest.fn()
    const onClose = jest.fn()
    window.addEventListener(API_GATEWAY_EVENT, listener)

    modalApi.openCustom('modal-api-test.direct', { foo: 'bar' }, { onClose })

    expect(listener).toHaveBeenCalledTimes(1)
    const [event] = listener.mock.calls[0]
    expect(event.detail).toEqual({
      type: ApiGatewayEventType.openCustomModal,
      payload: {
        id: 'modal-api-test.direct',
        instanceId: expect.any(String),
        payload: { foo: 'bar' },
        onClose
      }
    })

    window.removeEventListener(API_GATEWAY_EVENT, listener)
  })

  it('returns a handle whose close() dispatches a closeCustomModal event for the same id', () => {
    jest.mocked(isInIframe).mockReturnValue(false)
    const listener = jest.fn()
    window.addEventListener(API_GATEWAY_EVENT, listener)

    const handle = modalApi.openCustom('modal-api-test.close-handle', { foo: 'bar' })
    const openedInstanceId = listener.mock.calls[0][0].detail.payload.instanceId
    listener.mockClear()
    handle.close()

    expect(listener).toHaveBeenCalledTimes(1)
    const [event] = listener.mock.calls[0]
    expect(event.detail).toEqual({
      type: ApiGatewayEventType.closeCustomModal,
      payload: { id: 'modal-api-test.close-handle', instanceId: openedInstanceId }
    })

    window.removeEventListener(API_GATEWAY_EVENT, listener)
  })

  it('delegates to the parent window API when running inside an iframe', () => {
    jest.mocked(isInIframe).mockReturnValue(true)
    const closeHandle = { close: jest.fn() }
    const openCustom = jest.fn().mockReturnValue(closeHandle)
    jest.mocked(getPimcoreStudioApi).mockReturnValue({
      modal: { openCustom }
    } as unknown as ReturnType<typeof getPimcoreStudioApi>)

    const handle = modalApi.openCustom('modal-api-test.iframe', { foo: 'baz' })

    expect(openCustom).toHaveBeenCalledWith('modal-api-test.iframe', { foo: 'baz' }, undefined)
    expect(handle).toBe(closeHandle)
  })

  it('logs an error and returns a no-op handle instead of throwing when the parent API cannot be reached', () => {
    jest.mocked(isInIframe).mockReturnValue(true)
    jest.mocked(getPimcoreStudioApi).mockImplementation(() => { throw new Error('no api') })
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    let handle: ReturnType<typeof modalApi.openCustom> | undefined
    expect(() => { handle = modalApi.openCustom('modal-api-test.error', {}) }).not.toThrow()
    expect(errorSpy).toHaveBeenCalled()
    expect(() => { handle?.close() }).not.toThrow()

    errorSpy.mockRestore()
  })

  it('returns a no-op handle instead of recursing when the API lookup resolves to itself', () => {
    jest.mocked(isInIframe).mockReturnValue(true)
    jest.mocked(getPimcoreStudioApi).mockReturnValue({
      modal: modalApi
    } as unknown as ReturnType<typeof getPimcoreStudioApi>)
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    let handle: ReturnType<typeof modalApi.openCustom> | undefined
    expect(() => { handle = modalApi.openCustom('modal-api-test.self', {}) }).not.toThrow()
    expect(() => { handle?.close() }).not.toThrow()
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })
})
