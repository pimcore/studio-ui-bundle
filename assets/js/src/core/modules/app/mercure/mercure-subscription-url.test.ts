/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildMercureSubscriptionUrl } from './mercure-subscription-url'
import { getMercureProtocolVersion } from './mercure-authorization'

jest.mock('./mercure-authorization', () => ({
  getMercureProtocolVersion: jest.fn(() => '0.x')
}))

const protocolMock = getMercureProtocolVersion as jest.MockedFunction<typeof getMercureProtocolVersion>

const HUB = 'https://pimcore.example.com/hub'
const TOPICS = ['studio-backend-default', 'studio-backend-default/user/2']

describe('buildMercureSubscriptionUrl', () => {
  it('uses topic and lastEventID for 0.x hubs', () => {
    const url = buildMercureSubscriptionUrl(HUB, TOPICS, 'urn:uuid:1', '0.x')

    expect(url.origin + url.pathname).toBe(HUB)
    expect(url.searchParams.getAll('topic')).toEqual(TOPICS)
    expect(url.searchParams.get('lastEventID')).toBe('urn:uuid:1')
    expect(url.searchParams.has('match')).toBe(false)
    expect(url.searchParams.has('last_event_id')).toBe(false)
  })

  it('uses match and last_event_id for 1.0 hubs', () => {
    const url = buildMercureSubscriptionUrl(HUB, TOPICS, 'urn:uuid:1', '1.0')

    expect(url.searchParams.getAll('match')).toEqual(TOPICS)
    expect(url.searchParams.get('last_event_id')).toBe('urn:uuid:1')
    expect(url.searchParams.has('topic')).toBe(false)
    expect(url.searchParams.has('lastEventID')).toBe(false)
  })

  it('omits the last event id when there is none', () => {
    const url = buildMercureSubscriptionUrl(HUB, TOPICS, undefined, '1.0')

    expect(url.searchParams.has('last_event_id')).toBe(false)
  })

  it('defaults to the protocol the backend reported', () => {
    protocolMock.mockReturnValue('1.0')

    expect(buildMercureSubscriptionUrl(HUB, TOPICS).searchParams.getAll('match')).toEqual(TOPICS)
  })

  it('keeps query parameters of the hub url', () => {
    const url = buildMercureSubscriptionUrl(`${HUB}?foo=bar`, ['a'], undefined, '0.x')

    expect(url.searchParams.get('foo')).toBe('bar')
    expect(url.searchParams.getAll('topic')).toEqual(['a'])
  })
})
