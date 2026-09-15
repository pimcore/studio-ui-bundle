/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  clearExpandRequest,
  clearNotificationsSectionRequest,
  notificationsUiReducer,
  requestExpandNotification,
  requestNotificationsSection
} from './notifications-ui-slice'

// The slice self-registers with the app store on import; stub that side effect so the test
// exercises just the reducer. jest hoists this above the import.
jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

describe('notifications-ui slice', () => {
  it('records the requested notification id', () => {
    const state = notificationsUiReducer(undefined, requestExpandNotification(42))

    expect(state.expandRequest?.id).toBe(42)
  })

  it('advances the token on each request, including a repeat of the same id', () => {
    const first = notificationsUiReducer(undefined, requestExpandNotification(42))
    const second = notificationsUiReducer(first, requestExpandNotification(42))

    expect(first.expandRequest?.token).toBe(1)
    expect(second.expandRequest?.token).toBe(2)
    expect(second.expandRequest?.id).toBe(42)
  })

  it('advances the token when switching to a different id', () => {
    const first = notificationsUiReducer(undefined, requestExpandNotification(1))
    const second = notificationsUiReducer(first, requestExpandNotification(2))

    expect(second.expandRequest).toEqual({ id: 2, token: 2 })
  })

  it('clears the request once consumed so a remount does not re-expand', () => {
    const requested = notificationsUiReducer(undefined, requestExpandNotification(42))
    const cleared = notificationsUiReducer(requested, clearExpandRequest())

    expect(cleared.expandRequest).toBeNull()
  })

  it('records the requested section', () => {
    const state = notificationsUiReducer(undefined, requestNotificationsSection('settings'))

    expect(state.sectionRequest).toEqual({ section: 'settings', token: 1 })
  })

  it('advances the token on a repeat of the same section, so a tab left by hand is re-selected', () => {
    const first = notificationsUiReducer(undefined, requestNotificationsSection('settings'))
    const second = notificationsUiReducer(first, requestNotificationsSection('settings'))

    expect(second.sectionRequest).toEqual({ section: 'settings', token: 2 })
  })

  it('clears the section request once consumed so the user can switch tabs afterwards', () => {
    const requested = notificationsUiReducer(undefined, requestNotificationsSection('settings'))
    const cleared = notificationsUiReducer(requested, clearNotificationsSectionRequest())

    expect(cleared.sectionRequest).toBeNull()
  })

  it('keeps the two requests independent', () => {
    const withSection = notificationsUiReducer(undefined, requestNotificationsSection('inbox'))
    const withBoth = notificationsUiReducer(withSection, requestExpandNotification(7))

    expect(withBoth.sectionRequest).toEqual({ section: 'inbox', token: 1 })
    expect(withBoth.expandRequest).toEqual({ id: 7, token: 1 })
  })
})
