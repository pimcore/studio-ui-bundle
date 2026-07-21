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
import { useTranslation } from 'react-i18next'
import { Flex, Icon, Text } from '@sdk/components'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { NotificationSettingsCell } from './notification-settings-cell'
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
}

interface TypeGroup {
  key: string
  items: NotificationSubscribableType[]
}

/**
 * Groups arrive pre-ordered by the API's sortOrder, so first appearance is the intended order.
 */
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
  onChannelChange
}: NotificationSettingsViewProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const channelRegistry = container.get<DynamicTypeNotificationChannelRegistry>(
    serviceIds['DynamicTypes/NotificationChannelRegistry']
  )

  const groups = useMemo(() => groupTypes(items), [items])

  // A heading for a single group says nothing the panel title has not already said.
  const showGroupHeadings = groups.length > 1

  /** Icon comes from the registry; an unregistered channel still gets a usable column. */
  const channelIcon = (channelId: string): string => (
    channelRegistry.hasDynamicType(channelId)
      ? channelRegistry.getDynamicType(channelId).icon
      : 'notification-read'
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
              <Text type={ 'secondary' }>{t(channel.translationKey)}</Text>
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
              <div
                className={ styles.row }
                data-testid={ `notification-settings-row-${item.typeId}` }
                key={ item.typeId }
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
                    // A locked type still renders a switch, shown on and disabled: unlike an
                    // unsupported channel this *is* a live setting, it simply cannot be off.
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
          })}
        </React.Fragment>
      ))}
    </div>
  )
}
