/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockExists = jest.fn()
const mockT = jest.fn()

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    exists: (...args: unknown[]) => mockExists(...args),
    t: (...args: unknown[]) => mockT(...args)
  }
}))

// eslint-disable-next-line import/first
import { translateLabel } from './translate-label'

describe('translateLabel', () => {
  beforeEach(() => {
    mockExists.mockReset()
    mockT.mockReset()
  })

  it('resolves a key with a matching translation', () => {
    mockExists.mockReturnValue(true)
    mockT.mockReturnValue('Blue')

    const result = translateLabel('classification-store.color.blue')

    expect(result).toBe('Blue')
    expect(mockExists).toHaveBeenCalledWith('classification-store.color.blue', { nsSeparator: false })
    expect(mockT).toHaveBeenCalledWith('classification-store.color.blue', { nsSeparator: false })
  })

  it('returns the raw value unchanged for a key with no translation, without calling t()', () => {
    mockExists.mockReturnValue(false)

    const result = translateLabel('Some Untranslated Value')

    expect(result).toBe('Some Untranslated Value')
    expect(mockT).not.toHaveBeenCalled()
  })

  it('preserves values containing a colon instead of splitting them as a namespace', () => {
    mockExists.mockReturnValue(false)

    const result = translateLabel('Color: Blue')

    expect(result).toBe('Color: Blue')
  })

  it.each([
    ['', ''],
    ['   ', ''],
    [null, ''],
    [undefined, '']
  ])('returns an empty string for %p without calling i18next', (value, expected) => {
    const result = translateLabel(value)

    expect(result).toBe(expected)
    expect(mockExists).not.toHaveBeenCalled()
    expect(mockT).not.toHaveBeenCalled()
  })
})
