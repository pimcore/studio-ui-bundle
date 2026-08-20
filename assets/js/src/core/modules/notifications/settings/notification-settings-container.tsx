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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Box } from '@Pimcore/components/box/box'
import { Title } from '@Pimcore/components/title/title'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useMessage } from '@Pimcore/components/message/useMessage'
import {
  useNotificationGetSubscriptionsQuery,
  useNotificationUpdateSubscriptionsMutation
} from '../notifications-slice-enhanced'
import { useNotificationSettingsDraft } from './hooks/use-notification-settings-draft'
import { NotificationSettingsView } from './notification-settings-view'
import { NotificationSettingsToolbar } from './notification-settings-toolbar'

export const NotificationSettingsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { success } = useMessage()
  const { data, isLoading } = useNotificationGetSubscriptionsQuery()
  const [updateSubscriptions, { isLoading: isSaving }] = useNotificationUpdateSubscriptionsMutation()

  const {
    draft,
    isDirty,
    changedCount,
    setSubscribed,
    setChannel,
    reset,
    toUpdateItems,
    applyServerState
  } = useNotificationSettingsDraft(data?.items)

  const onSave = (): void => {
    updateSubscriptions({ notificationUpdateSubscriptionsParameters: { items: toUpdateItems() } })
      .unwrap()
      .then((stored) => {
        // Seeded from the response rather than waiting for the refetch, so a save the server
        // normalises back to the current state still clears the dirty flag.
        applyServerState(stored.items)
        success(t('notifications.settings.saved'))
      })
      .catch((error: Error) => {
        trackError(new ApiError(error))
      })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme={ 'secondary' }>
          <NotificationSettingsToolbar
            changedCount={ changedCount }
            isDirty={ isDirty }
            isSaving={ isSaving }
            onDiscard={ reset }
            onSave={ onSave }
          />
        </Toolbar>
      }
    >
      <Content loading={ isLoading }>
        <Box padding={ 'small' }>
          <Flex
            gap={ 'small' }
            vertical
          >
            <Flex
              gap={ 'mini' }
              vertical
            >
              <Title>{t('notifications.settings.label')}</Title>
              <Text type={ 'secondary' }>
                {/* With no channel beyond the pop-up there is nothing to "add on top". */}
                {(data?.availableChannels.length ?? 0) > 1
                  ? t('notifications.settings.description')
                  : t('notifications.settings.description-popup-only')}
              </Text>
            </Flex>

            {data !== undefined && (
              <NotificationSettingsView
                availableChannels={ data.availableChannels }
                draft={ draft }
                items={ data.items }
                onChannelChange={ setChannel }
                onSubscribedChange={ setSubscribed }
              />
            )}
          </Flex>
        </Box>
      </Content>
    </ContentLayout>
  )
}
