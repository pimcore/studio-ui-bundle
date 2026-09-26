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
      payload: { id: 'modal-api-test.direct', payload: { foo: 'bar' }, onClose }
    })

    window.removeEventListener(API_GATEWAY_EVENT, listener)
  })

  it('delegates to the parent window API when running inside an iframe', () => {
    jest.mocked(isInIframe).mockReturnValue(true)
    const openCustom = jest.fn()
    jest.mocked(getPimcoreStudioApi).mockReturnValue({
      modal: { openCustom }
    } as unknown as ReturnType<typeof getPimcoreStudioApi>)

    modalApi.openCustom('modal-api-test.iframe', { foo: 'baz' })

    expect(openCustom).toHaveBeenCalledWith('modal-api-test.iframe', { foo: 'baz' }, undefined)
  })

  it('logs an error instead of throwing when the parent API cannot be reached', () => {
    jest.mocked(isInIframe).mockReturnValue(true)
    jest.mocked(getPimcoreStudioApi).mockImplementation(() => { throw new Error('no api') })
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => { modalApi.openCustom('modal-api-test.error', {}) }).not.toThrow()
    expect(errorSpy).toHaveBeenCalled()

    errorSpy.mockRestore()
  })
})
