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
import { injectable } from 'inversify'
import { DynamicTypeAbstract } from '@Pimcore/modules/element/dynamic-types/registry/dynamic-type-registry-abstract'

export interface NotificationRenderProps {
  /** Matches the notification's `type`, e.g. `collab.mention`. */
  type: string
  title: string
  sender: string | null
  /** Parsed `payload`; null when a notification carries none. */
  payload: Record<string, unknown> | null
}

export interface NotificationDetailRenderProps extends NotificationRenderProps {
  /** Only available once the detail has been fetched. */
  message?: string | null
}

export interface NotificationDetailSlots {
  /**
   * The notification's rendered attachment, or null when it has none. Place it inside your template
   * to position it yourself, or ignore it and let the host append it below (see appendsAttachment).
   */
  attachment: React.JSX.Element | null
}

/**
 * Renders a specific notification type.
 *
 * A bundle contributing a notification type registers one of these to show something better
 * than a title and a sender — thread context, a deep link, an excerpt. Both methods may return
 * null, in which case the host falls back to the plain rendering, so a definition can enrich
 * just the detail view and leave the toast alone.
 */
@injectable()
export abstract class DynamicTypeAbstractNotification extends DynamicTypeAbstract {
  /** The notification type id this definition renders. */
  abstract readonly id: string

  /**
   * Content for the toast. Keep it short; the host supplies the surrounding chrome and the
   * action that opens the bell.
   */
  getPopupContent (props: NotificationRenderProps): React.JSX.Element | null {
    return null
  }

  /**
   * Content for the expanded row in the notification list. `slots.attachment` is the notification's
   * rendered attachment (or null) — place it where you like, or leave it to the host.
   */
  getDetailContent (props: NotificationDetailRenderProps, slots: NotificationDetailSlots): React.JSX.Element | null {
    return null
  }

  /**
   * When getDetailContent returns custom content, whether the host still renders the attachment
   * below it. Default true, so a definition that ignores attachments never drops one; return false
   * to place `slots.attachment` yourself, or to hide the attachment entirely.
   */
  appendsAttachment (): boolean {
    return true
  }
}
