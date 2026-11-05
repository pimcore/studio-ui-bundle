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
import { render } from '@testing-library/react'
import { useAlertModal } from './use-alert-modal'

const modal = {
  info: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  success: jest.fn()
}

jest.mock('@sdk/components', () => ({
  useStudioModal: () => ({ modal })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => `t:${key}` })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

// Opens one alert through the hook and hands back the config antd was called with.
const openAlert = (open: (alert: ReturnType<typeof useAlertModal>) => void, method: keyof typeof modal): Record<string, unknown> => {
  const Harness = (): null => {
    open(useAlertModal())

    return null
  }

  render(<Harness />)

  return modal[method].mock.calls.at(-1)![0]
}

describe('useAlertModal', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('translates a title it is given', () => {
    const config = openAlert((alert) => { alert.error({ content: 'boom', title: 'custom.title' }) }, 'error')

    expect(config.title).toBe('t:custom.title')
  })

  /**
   * The error handler reports a plain error as `{ title: null }`. antd renders its title slot for
   * every value that is not undefined or null, so passing the translation of `null` through would
   * leave an empty heading above the message and the icon aligned to it rather than to the text.
   */
  it('falls back to the default heading when the title is null', () => {
    const config = openAlert((alert) => { alert.error({ content: 'boom', title: null }) }, 'error')

    expect(config.title).toBe('t:error')
  })

  it.each([
    ['info', 't:info'],
    ['warn', 't:warning'],
    ['success', 't:success']
  ] as const)('falls back to the default heading for %s', (kind, expected) => {
    const method = kind === 'warn' ? 'warning' : kind
    const config = openAlert((alert) => { alert[kind]({ content: 'hello', title: null }) }, method)

    expect(config.title).toBe(expected)
  })
})
