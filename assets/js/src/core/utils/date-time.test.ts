/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {}
}))

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    language: 'en',
    // Capture what is forwarded to Intl so we can assert the timeZone wiring deterministically
    // without initialising the full i18next datetime formatter.
    format: jest.fn((date: Date, _fmt: string, _lng: string, opts: Record<string, unknown>) =>
      JSON.stringify({ time: date.getTime(), opts })
    )
  }
}))

// eslint-disable-next-line import/first
import { formatDate, formatDateTime, formatTime } from './date-time'

const TS_SECONDS = 1705320000 // 2024-01-15T12:00:00Z

const parse = (out: string): { time: number, opts: Record<string, unknown> } => JSON.parse(out)

describe('formatDateTime timeZone forwarding', () => {
  it('forwards the timeZone option into the Intl options', () => {
    const { time, opts } = parse(formatDateTime({ timestamp: TS_SECONDS, dateStyle: 'short', timeStyle: 'short', timeZone: 'Europe/Vienna' }))
    expect(opts.timeZone).toBe('Europe/Vienna')
    expect(time).toBe(TS_SECONDS * 1000) // numeric timestamps are interpreted as seconds
  })

  it('omits the timeZone option when none is supplied (browser-local)', () => {
    const { opts } = parse(formatDateTime({ timestamp: TS_SECONDS, dateStyle: 'short' }))
    expect(opts).not.toHaveProperty('timeZone')
  })

  it('returns an empty string for a null timestamp', () => {
    expect(formatDateTime({ timestamp: null })).toBe('')
  })
})

describe('formatDate / formatTime timeZone passthrough', () => {
  it('formatDate forwards the optional timeZone', () => {
    expect(parse(formatDate(TS_SECONDS, 'Europe/Vienna')).opts.timeZone).toBe('Europe/Vienna')
    expect(parse(formatDate(TS_SECONDS)).opts).not.toHaveProperty('timeZone')
  })

  it('formatTime forwards the optional timeZone', () => {
    expect(parse(formatTime(TS_SECONDS, 'Europe/Vienna')).opts.timeZone).toBe('Europe/Vienna')
  })
})
