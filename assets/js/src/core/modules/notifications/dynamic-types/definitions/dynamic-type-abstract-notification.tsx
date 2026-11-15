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
  /** Place it yourself, or ignore it and let the host append it below (see appendsAttachment). */
  attachment: React.JSX.Element | null
}

/**
 * Renders a specific notification type. Either method may return null to fall back to the host's
 * plain title-and-sender rendering, so a definition can enrich only the detail view.
 */
@injectable()
export abstract class DynamicTypeAbstractNotification extends DynamicTypeAbstract {
  /** The notification type id this definition renders. */
  abstract readonly id: string

  /** Content for the toast; the host supplies the chrome and the action that opens the bell. */
  getPopupContent (props: NotificationRenderProps): React.JSX.Element | null {
    return null
  }

  /** Content for the expanded row in the notification list. */
  getDetailContent (props: NotificationDetailRenderProps, slots: NotificationDetailSlots): React.JSX.Element | null {
    return null
  }

  /** Whether the host appends the attachment below custom detail content. */
  appendsAttachment (): boolean {
    return true
  }
}
