/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { toDayJs, fromDayJs, toServerWallClock, formatFilterDate, parseFilterDate } from './date-picker-utils'

dayjs.extend(utc)
dayjs.extend(timezone)

// Pimcore date/datetime timezone semantics: respectTimezone=true means the value is an absolute
// instant rendered in the browser timezone; respectTimezone=false means the value is a wall-clock
// anchored to the server timezone (so the displayed wall-clock does not drift between browsers).
//
// All assertions are independent of the host (browser) timezone the test process runs under,
// except where they intentionally compare against the host-local `dayjs.unix()` rendering (the
// respectTimezone=true case), which is the no-regression property.

// Two reference instants: winter (Vienna = UTC+1) and summer/DST (Vienna = UTC+2).
const WINTER_UNIX = dayjs.utc('2024-01-15T12:00:00Z').unix()
const SUMMER_UNIX = dayjs.utc('2024-07-15T12:00:00Z').unix()

describe('toServerWallClock', () => {
  it('renders the instant as the wall-clock of the given server timezone (winter)', () => {
    expect(toServerWallClock(dayjs.unix(WINTER_UNIX), 'Europe/Vienna').format('YYYY-MM-DD HH:mm'))
      .toBe('2024-01-15 13:00') // UTC+1
    expect(toServerWallClock(dayjs.unix(WINTER_UNIX), 'America/New_York').format('YYYY-MM-DD HH:mm'))
      .toBe('2024-01-15 07:00') // UTC-5
    expect(toServerWallClock(dayjs.unix(WINTER_UNIX), 'UTC').format('YYYY-MM-DD HH:mm'))
      .toBe('2024-01-15 12:00')
  })

  it('honours DST for the server timezone (summer)', () => {
    expect(toServerWallClock(dayjs.unix(SUMMER_UNIX), 'Europe/Vienna').format('YYYY-MM-DD HH:mm'))
      .toBe('2024-07-15 14:00') // UTC+2 in summer
  })
})

describe('toDayJs — respectTimezone === false (server-timezone wall-clock, no browser drift)', () => {
  it('anchors numeric values to the server timezone wall-clock', () => {
    const result = toDayJs(WINTER_UNIX, undefined, { respectTimezone: false, timezone: 'Europe/Vienna' })
    expect(result?.format('YYYY-MM-DD HH:mm')).toBe('2024-01-15 13:00')
  })

  it('round-trips stably: stored -> display -> naive string -> server-tz parse -> stored', () => {
    const serverTz = 'Europe/Vienna'
    // Read for display (what the picker shows / edits).
    const display = toDayJs(WINTER_UNIX, undefined, { respectTimezone: false, timezone: serverTz })
    // Save: non-respect-timezone fields emit a naive wall-clock string.
    const naive = fromDayJs(display, 'dateString', 'YYYY-MM-DD HH:mm')
    expect(naive).toBe('2024-01-15 13:00')
    // Backend Carbon::parse interprets the naive string in the server timezone.
    const recovered = dayjs.tz(naive as string, serverTz).unix()
    expect(recovered).toBe(WINTER_UNIX)
  })

  it('falls back to the absolute instant when no server timezone is configured', () => {
    const result = toDayJs(WINTER_UNIX, undefined, { respectTimezone: false, timezone: '' })
    expect(result?.valueOf()).toBe(dayjs.unix(WINTER_UNIX).valueOf())
  })
})

describe('toDayJs — respectTimezone !== false (absolute instant in browser timezone)', () => {
  it('returns the same instant as dayjs.unix (no regression) when respectTimezone is true', () => {
    const result = toDayJs(WINTER_UNIX, undefined, { respectTimezone: true, timezone: 'Europe/Vienna' })
    expect(result?.valueOf()).toBe(dayjs.unix(WINTER_UNIX).valueOf())
  })

  it('does not apply the server timezone when respectTimezone is omitted', () => {
    expect(toDayJs(WINTER_UNIX)?.valueOf()).toBe(dayjs.unix(WINTER_UNIX).valueOf())
    expect(toDayJs(WINTER_UNIX, undefined, { timezone: 'Europe/Vienna' })?.valueOf())
      .toBe(dayjs.unix(WINTER_UNIX).valueOf())
  })
})

describe('toDayJs — non-numeric inputs are unchanged', () => {
  it('passes through dayjs values', () => {
    const d = dayjs.unix(WINTER_UNIX)
    expect(toDayJs(d, undefined, { respectTimezone: false, timezone: 'Europe/Vienna' })).toBe(d)
  })

  it('parses strings with the given format and returns null for nullish', () => {
    expect(toDayJs('2024-01-15', 'YYYY-MM-DD')?.format('YYYY-MM-DD')).toBe('2024-01-15')
    expect(toDayJs(null)).toBeNull()
    expect(toDayJs()).toBeNull()
  })
})

describe('formatFilterDate', () => {
  // The DatePicker filter component emits a browser-local timestamp (seconds) — i.e. browser-local
  // midnight of the day the user clicked, as produced by fromDayJs's 'timestamp' branch. Mock that
  // shape directly so the test is independent of the host tz the jest runtime uses.
  const tsBrowserLocalMidnight = new Date(2026, 2, 15).getTime() / 1000

  it('returns null for null', () => {
    expect(formatFilterDate(null, true)).toBeNull()
    expect(formatFilterDate(null, false)).toBeNull()
  })

  it('respectTimezone=false emits the picked calendar day as UTC ISO 8601', () => {
    expect(formatFilterDate(tsBrowserLocalMidnight, false)).toBe('2026-03-15T00:00:00Z')
  })

  it('respectTimezone=true emits an ISO 8601 string with browser offset (instant)', () => {
    const out = formatFilterDate(tsBrowserLocalMidnight, true)!
    // ISO includes the date, "T", time, and a numeric offset or Z.
    expect(out).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z)$/)
    // Round-trips back to the same instant when parsed.
    expect(dayjs(out).unix()).toBe(tsBrowserLocalMidnight)
  })
})

describe('parseFilterDate (read-back round-trip)', () => {
  // Pins the regression: stored UTC ISO must not shift the picker day in browsers west of UTC.
  const tsBrowserLocalMidnight = new Date(2026, 2, 15).getTime() / 1000

  it('returns null for null', () => {
    expect(parseFilterDate(null)).toBeNull()
  })

  it('round-trips a respect=false stored value back to the originally picked day', () => {
    const stored = formatFilterDate(tsBrowserLocalMidnight, false)!
    expect(stored).toBe('2026-03-15T00:00:00Z')
    const recovered = parseFilterDate(stored)!
    expect(dayjs.unix(recovered).format('YYYY-MM-DD')).toBe('2026-03-15')
  })

  it('round-trips a respect=true stored value back to the originally picked day', () => {
    const stored = formatFilterDate(tsBrowserLocalMidnight, true)!
    const recovered = parseFilterDate(stored)!
    expect(dayjs.unix(recovered).format('YYYY-MM-DD')).toBe('2026-03-15')
  })

  it('ignores any offset or Z marker on the stored value (calendar day only)', () => {
    expect(dayjs.unix(parseFilterDate('2026-03-15T00:00:00Z')!).format('YYYY-MM-DD')).toBe('2026-03-15')
    expect(dayjs.unix(parseFilterDate('2026-03-15T00:00:00-04:00')!).format('YYYY-MM-DD')).toBe('2026-03-15')
    expect(dayjs.unix(parseFilterDate('2026-03-15T00:00:00+09:00')!).format('YYYY-MM-DD')).toBe('2026-03-15')
  })
})

describe('fromDayJs — unchanged save behaviour', () => {
  it('formats a dateString with the supplied output format', () => {
    expect(fromDayJs(dayjs('2024-01-15 13:30'), 'dateString', 'YYYY-MM-DD HH:mm')).toBe('2024-01-15 13:30')
  })

  it('returns null for null', () => {
    expect(fromDayJs(null, 'dateString', 'YYYY-MM-DD')).toBeNull()
  })

  it('emits unix seconds (start of day) for the timestamp output type', () => {
    const value = dayjs('2024-01-15 13:30')
    const ts = fromDayJs(value, 'timestamp') as number
    expect(ts).toBe(new Date(2024, 0, 15).getTime() / 1000)
  })
})
