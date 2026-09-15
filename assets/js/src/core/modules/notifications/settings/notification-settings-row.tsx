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
import { useTranslation } from 'react-i18next'
import { Text } from '@sdk/components'
import { NotificationSettingsCell } from './notification-settings-cell'
import { useStyles } from './notification-settings.styles'
import type { NotificationAvailableChannel, NotificationSubscribableType } from '../notifications-slice.gen'
import { type NotificationDraftEntry } from './hooks/use-notification-settings-draft'

export interface NotificationSettingsRowProps {
  item: NotificationSubscribableType
  entry: NotificationDraftEntry
  availableChannels: NotificationAvailableChannel[]
  onSubscribedChange: (typeId: string, subscribed: boolean) => void
  onChannelChange: (typeId: string, channelId: string, enabled: boolean) => void
  saving?: boolean
}

/**
 * One notification type: label, description, the Notify-me switch and a cell per channel.
 * Split out so the channel loop does not nest inside the view's group and type loops.
 */
export const NotificationSettingsRow = ({
  item,
  entry,
  availableChannels,
  onSubscribedChange,
  onChannelChange,
  saving = false
}: NotificationSettingsRowProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  return (
    <div
      className={ styles.row }
      data-testid={ `notification-settings-row-${item.typeId}` }
    >
      <div className={ styles.typeColumn }>
        <Text strong>{t(item.translationKey)}</Text>
        <div className={ styles.typeDescription }>
          <Text type={ 'secondary' }>{t(item.descriptionKey)}</Text>
        </div>
      </div>

      <div className={ styles.cellColumn }>
        <NotificationSettingsCell
          ariaLabel={ `${t('notifications.settings.column.subscribed')} ${t(item.translationKey)}` }
          checked={ entry.subscribed }
          // Locked renders a disabled switch, not a dash: it is a live setting that cannot be off.
          disabled={ item.subscriptionLocked || saving }
          onChange={ (checked) => { onSubscribedChange(item.typeId, checked) } }
          supported
        />
      </div>

      {availableChannels.map((channel) => {
        const supported = item.channels.find((typeChannel) => typeChannel.id === channel.id)?.supported ?? false

        return (
          <div
            className={ styles.cellColumn }
            key={ channel.id }
          >
            <NotificationSettingsCell
              ariaLabel={ `${t(channel.translationKey)} ${t(item.translationKey)}` }
              checked={ entry.channels.has(channel.id) }
              disabled={ !entry.subscribed || saving }
              onChange={ (checked) => { onChannelChange(item.typeId, channel.id, checked) } }
              supported={ supported }
            />
          </div>
        )
      })}
    </div>
  )
}
