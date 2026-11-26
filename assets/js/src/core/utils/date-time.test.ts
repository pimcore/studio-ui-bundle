/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockGetState = jest.fn()

jest.mock('@Pimcore/app/store', () => ({
  store: { getState: () => mockGetState() }
}))

jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  selectCurrentUser: (state: any) => state.auth
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {}
}))

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    language: 'en',
    // Capture what is forwarded to Intl so we can assert the lng + timeZone wiring deterministically
    // without initialising the full i18next datetime formatter.
    format: jest.fn((date: Date, _fmt: string, lng: string, opts: Record<string, unknown>) =>
      JSON.stringify({ time: date.getTime(), lng, opts })
    )
  }
}))

/* eslint-disable import/first */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { formatDate, formatDateTime, formatTime, pickerValueToUnix, resolveDateTimeLocale } from './date-time'
/* eslint-enable import/first */

dayjs.extend(utc)

const TS_SECONDS = 1705320000 // 2024-01-15T12:00:00Z

const parse = (out: string): { time: number, lng: string, opts: Record<string, unknown> } => JSON.parse(out)

const setUserLocale = (locale: string | null): void => {
  mockGetState.mockReturnValue({ auth: { dateTimeLocale: locale } })
}

describe('formatDateTime timeZone forwarding', () => {
  beforeEach(() => { setUserLocale('en-US') })

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
  beforeEach(() => { setUserLocale('en-US') })

  it('formatDate forwards the optional timeZone', () => {
    expect(parse(formatDate(TS_SECONDS, 'Europe/Vienna')).opts.timeZone).toBe('Europe/Vienna')
    expect(parse(formatDate(TS_SECONDS)).opts).not.toHaveProperty('timeZone')
  })

  it('formatTime forwards the optional timeZone', () => {
    expect(parse(formatTime(TS_SECONDS, 'Europe/Vienna')).opts.timeZone).toBe('Europe/Vienna')
  })
})

describe('resolveDateTimeLocale', () => {
  afterEach(() => { mockGetState.mockReset() })

  it('honours explicit lng over everything else', () => {
    setUserLocale('de-DE')
    expect(resolveDateTimeLocale('fr-FR')).toBe('fr-FR')
  })

  it('uses user.dateTimeLocale when set', () => {
    setUserLocale('de-DE')
    expect(resolveDateTimeLocale()).toBe('de-DE')
  })

  it('falls back to Intl.resolvedOptions().locale when the user setting is empty', () => {
    setUserLocale('')
    const expected = new Intl.DateTimeFormat().resolvedOptions().locale
    expect(resolveDateTimeLocale()).toBe(expected)
  })

  it('falls back to Intl.resolvedOptions().locale when the user setting is null', () => {
    setUserLocale(null)
    const expected = new Intl.DateTimeFormat().resolvedOptions().locale
    expect(resolveDateTimeLocale()).toBe(expected)
  })

  it('tolerates a throwing store (early-boot / isolated tests)', () => {
    mockGetState.mockImplementation(() => { throw new Error('not ready') })
    const expected = new Intl.DateTimeFormat().resolvedOptions().locale
    expect(resolveDateTimeLocale()).toBe(expected)
  })
})

describe('formatDateTime locale wiring', () => {
  afterEach(() => { mockGetState.mockReset() })

  it('passes the user-configured dateTimeLocale through to Intl', () => {
    setUserLocale('de-DE')
    expect(parse(formatDateTime({ timestamp: TS_SECONDS, dateStyle: 'short' })).lng).toBe('de-DE')
  })

  it('lets an explicit lng arg override the user setting', () => {
    setUserLocale('de-DE')
    expect(parse(formatDateTime({ timestamp: TS_SECONDS, lng: 'fr-FR', dateStyle: 'short' })).lng).toBe('fr-FR')
  })
})

describe('pickerValueToUnix', () => {
  const WALL_CLOCK = '2027-07-15T10:00:00'

  // The antd picker seeds a fresh value from `dayjs().tz()` (rc-picker getNow), which carries the UTC offset of
  // *today*. Whatever offset it carries, the picked wall-clock time has to be read in the browser timezone,
  // the same way FormattedDateTime renders it.
  it.each([-300, 0, 60, 120])('reads the picked wall-clock time in the browser timezone for a value pinned to UTC%i min', (offset) => {
    const picked = dayjs(WALL_CLOCK).utcOffset(offset, true)

    expect(picked.format('YYYY-MM-DDTHH:mm:ss')).toBe(WALL_CLOCK)
    expect(pickerValueToUnix(picked)).toBe(dayjs(WALL_CLOCK).unix())
  })

  it('returns 0 when the value was cleared', () => {
    expect(pickerValueToUnix(null)).toBe(0)
  })
})
