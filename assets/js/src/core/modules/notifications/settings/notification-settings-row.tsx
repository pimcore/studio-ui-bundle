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
}

/**
 * One notification type: its label and description, the Notify-me switch, and a cell per
 * available channel. Kept as its own component so the channel loop does not nest inside the
 * view's group and type loops — beyond a certain depth that is both hard to read and a lint
 * failure.
 */
export const NotificationSettingsRow = ({
  item,
  entry,
  availableChannels,
  onSubscribedChange,
  onChannelChange
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
          // A locked type still renders a switch, shown on and disabled: unlike an unsupported
          // channel this *is* a live setting, it simply cannot be off.
          disabled={ item.subscriptionLocked }
          onChange={ (checked) => { onSubscribedChange(item.typeId, checked) } }
          supported
        />
      </div>

      {availableChannels.map((channel) => {
        const supported = item.channels.find((entry) => entry.id === channel.id)?.supported ?? false

        return (
          <div
            className={ styles.cellColumn }
            key={ channel.id }
          >
            <NotificationSettingsCell
              ariaLabel={ `${t(channel.translationKey)} ${t(item.translationKey)}` }
              checked={ entry.channels.has(channel.id) }
              disabled={ !entry.subscribed }
              onChange={ (checked) => { onChannelChange(item.typeId, channel.id, checked) } }
              supported={ supported }
            />
          </div>
        )
      })}
    </div>
  )
}
