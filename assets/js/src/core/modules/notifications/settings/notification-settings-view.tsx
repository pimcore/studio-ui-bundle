/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { Flex, Icon, Text } from '@sdk/components'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { NotificationSettingsRow } from './notification-settings-row'
import { type DynamicTypeNotificationChannelRegistry } from '../dynamic-types/registry/dynamic-type-notification-channel-registry'
import { useStyles } from './notification-settings.styles'
import type {
  NotificationAvailableChannel,
  NotificationSubscribableType
} from '../notifications-slice.gen'
import { type NotificationDraft } from './hooks/use-notification-settings-draft'

export interface NotificationSettingsViewProps {
  items: NotificationSubscribableType[]
  availableChannels: NotificationAvailableChannel[]
  draft: NotificationDraft
  onSubscribedChange: (typeId: string, subscribed: boolean) => void
  onChannelChange: (typeId: string, channelId: string, enabled: boolean) => void
  saving?: boolean
}

interface TypeGroup {
  key: string
  items: NotificationSubscribableType[]
}

// Items arrive pre-ordered by the API's sortOrder, so first appearance is the intended order.
const groupTypes = (items: NotificationSubscribableType[]): TypeGroup[] => {
  const groups: TypeGroup[] = []

  items.forEach((item) => {
    const existing = groups.find((group) => group.key === item.group)

    if (existing !== undefined) {
      existing.items.push(item)

      return
    }

    groups.push({ key: item.group, items: [item] })
  })

  return groups
}

export const NotificationSettingsView = ({
  items,
  availableChannels,
  draft,
  onSubscribedChange,
  onChannelChange,
  saving = false
}: NotificationSettingsViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const channelRegistry = container.get<DynamicTypeNotificationChannelRegistry>(
    serviceIds['DynamicTypes/NotificationChannelRegistry']
  )

  const groups = useMemo(() => groupTypes(items), [items])

  // A single heading would only repeat the panel title.
  const showGroupHeadings = groups.length > 1

  const channelIcon = (channelId: string): string => (
    channelRegistry.hasDynamicType(channelId)
      ? channelRegistry.getDynamicType(channelId).icon
      : 'notification-read'
  )

  // A registered channel definition may override the API's label (documented on the abstract);
  // fall back to the API key when it doesn't, mirroring channelIcon.
  const channelLabelKey = (channel: NotificationAvailableChannel): string => (
    channelRegistry.hasDynamicType(channel.id)
      ? channelRegistry.getDynamicType(channel.id).translationKey ?? channel.translationKey
      : channel.translationKey
  )

  return (
    <div className={ styles.table }>
      <div className={ [styles.row, styles.head].join(' ') }>
        <div className={ styles.typeColumn }>
          <Text type={ 'secondary' }>{t('notifications.settings.column.type')}</Text>
        </div>
        <div className={ styles.cellColumn }>
          <Text type={ 'secondary' }>{t('notifications.settings.column.subscribed')}</Text>
        </div>
        {availableChannels.map((channel) => (
          <div
            className={ styles.cellColumn }
            key={ channel.id }
          >
            <Flex
              align={ 'center' }
              gap={ 'mini' }
              justify={ 'center' }
            >
              <Icon value={ channelIcon(channel.id) } />
              <Text type={ 'secondary' }>{t(channelLabelKey(channel))}</Text>
              {/* Explained rather than disabled: the preference stores and starts working the
                  moment the account can be reached. */}
              {!isNil(channel.unavailableReasonKey) && (
                <Tooltip title={ t(channel.unavailableReasonKey) }>
                  <span
                    aria-label={ t(channel.unavailableReasonKey) }
                    data-testid={ `notification-settings-channel-warning-${channel.id}` }
                  >
                    <Icon value={ 'alert-outline' } />
                  </span>
                </Tooltip>
              )}
            </Flex>
          </div>
        ))}
      </div>

      {groups.map((group) => (
        <React.Fragment key={ group.key }>
          {showGroupHeadings && (
            <div className={ styles.groupRow }>
              <Text type={ 'secondary' }>{t(`notifications.settings.group.${group.key}`)}</Text>
            </div>
          )}

          {group.items.map((item) => {
            const entry = draft[item.typeId]

            if (entry === undefined) {
              return null
            }

            return (
              <NotificationSettingsRow
                availableChannels={ availableChannels }
                entry={ entry }
                item={ item }
                key={ item.typeId }
                onChannelChange={ onChannelChange }
                onSubscribedChange={ onSubscribedChange }
                saving={ saving }
              />
            )
          })}
        </React.Fragment>
      ))}
    </div>
  )
}
