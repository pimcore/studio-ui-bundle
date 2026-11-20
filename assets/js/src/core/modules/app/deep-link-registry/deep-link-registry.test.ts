/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DeepLinkRegistry, type DeepLinkHandler } from './deep-link-registry'
import trackError from '@Pimcore/modules/app/error-handler'

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const trackErrorMock = trackError as jest.Mock

const createHandler = (name: string): DeepLinkHandler => ({
  name,
  handle: jest.fn()
})

describe('DeepLinkRegistry', () => {
  beforeEach(() => {
    trackErrorMock.mockReset()
  })

  it('returns a registered handler by its name', () => {
    const registry = new DeepLinkRegistry()
    const handler = createHandler('tree')

    registry.register(handler)

    expect(registry.get('tree')).toBe(handler)
    expect(trackErrorMock).not.toHaveBeenCalled()
  })

  it('returns undefined for an unknown name', () => {
    const registry = new DeepLinkRegistry()
    registry.register(createHandler('tree'))

    expect(registry.get('unknown')).toBeUndefined()
  })

  it('keeps the first handler and reports a second one with the same name', () => {
    const registry = new DeepLinkRegistry()
    const first = createHandler('tree')

    registry.register(first)
    registry.register(createHandler('tree'))

    expect(registry.get('tree')).toBe(first)
    expect(trackErrorMock).toHaveBeenCalledTimes(1)
  })

  it('does not throw when the error tracking re-throws on a duplicate name', () => {
    trackErrorMock.mockImplementation(() => { throw new Error('tracked') })
    const registry = new DeepLinkRegistry()
    const first = createHandler('tree')
    registry.register(first)

    expect(() => { registry.register(createHandler('tree')) }).not.toThrow()
    expect(registry.get('tree')).toBe(first)
  })
})
