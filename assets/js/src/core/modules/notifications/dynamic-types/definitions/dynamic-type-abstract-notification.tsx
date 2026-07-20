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

  /** Content for the expanded row in the notification list. */
  getDetailContent (props: NotificationDetailRenderProps): React.JSX.Element | null {
    return null
  }
}
