/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { NotificationMessageHandler } from './notification-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'

const dispatch = jest.fn((..._args: unknown[]) => undefined)
const invalidateTags = jest.fn((..._args: unknown[]) => ({ type: 'invalidateTags' }))
const updateQueryData = jest.fn((..._args: unknown[]) => ({ type: 'updateQueryData' }))

jest.mock('@Pimcore/app/store', () => ({
  store: {
    dispatch: (...args: unknown[]) => { dispatch(...args) },
    getState: () => ({})
  }
}))

jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  selectCurrentUser: () => ({ id: 7 })
}))

jest.mock('@Pimcore/modules/notifications/notifications-slice-enhanced', () => ({
  api: {
    util: {
      invalidateTags: (...args: unknown[]) => invalidateTags(...args),
      updateQueryData: (...args: unknown[]) => updateQueryData(...args)
    }
  }
}))

jest.mock('@Pimcore/app/api/pimcore/tags', () => ({
  invalidatingTags: { NOTIFICATIONS: () => ['NOTIFICATIONS'] }
}))

const RECIPIENT_ID = 7

const message = (notification: Record<string, unknown>): AbstractMercureMessage => ({
  payload: {
    unreadNotificationsCount: 3,
    notification: {
      id: 1,
      type: 'info',
      title: 'Title',
      read: false,
      creationDate: 1707312457,
      recipient: RECIPIENT_ID,
      sender: 'Someone',
      ...notification
    }
  }
} as unknown as AbstractMercureMessage)

describe('NotificationMessageHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('raises the toast when the recipient wants pop-ups', async () => {
    const onMessage = jest.fn()

    await new NotificationMessageHandler(onMessage).handleMessage(message({ popup: true }))

    expect(onMessage).toHaveBeenCalledTimes(1)
  })

  it('suppresses only the toast when the recipient has pop-ups off', async () => {
    const onMessage = jest.fn()

    await new NotificationMessageHandler(onMessage).handleMessage(message({ popup: false }))

    expect(onMessage).not.toHaveBeenCalled()
    expect(invalidateTags).toHaveBeenCalledTimes(1)
    expect(updateQueryData).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledTimes(2)
  })

  it('raises the toast when the field is absent', async () => {
    const onMessage = jest.fn()

    await new NotificationMessageHandler(onMessage).handleMessage(message({}))

    expect(onMessage).toHaveBeenCalledTimes(1)
  })

  it('still updates the bell when the toast is shown', async () => {
    const onMessage = jest.fn()

    await new NotificationMessageHandler(onMessage).handleMessage(message({ popup: true }))

    expect(invalidateTags).toHaveBeenCalledTimes(1)
    expect(updateQueryData).toHaveBeenCalledTimes(1)
  })

  it('only handles notifications addressed to the current user', () => {
    const handler = new NotificationMessageHandler(jest.fn())

    expect(handler.shouldHandle(message({}))).toBe(true)
    expect(handler.shouldHandle(message({ recipient: 999 }))).toBe(false)
  })
})
