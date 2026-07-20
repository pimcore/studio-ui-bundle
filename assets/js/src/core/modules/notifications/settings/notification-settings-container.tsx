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
import {
  useNotificationGetSubscriptionsQuery,
  useNotificationUpdateSubscriptionsMutation
} from '../notifications-slice-enhanced'
import { useNotificationSettingsDraft } from './hooks/use-notification-settings-draft'
import { NotificationSettingsView } from './notification-settings-view'
import { NotificationSettingsToolbar } from './notification-settings-toolbar'

export const NotificationSettingsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { data, isLoading } = useNotificationGetSubscriptionsQuery()
  const [updateSubscriptions, { isLoading: isSaving }] = useNotificationUpdateSubscriptionsMutation()

  const {
    draft,
    isDirty,
    changedCount,
    setSubscribed,
    setChannel,
    reset,
    toUpdateItems
  } = useNotificationSettingsDraft(data?.items)

  const onSave = (): void => {
    updateSubscriptions({ notificationUpdateSubscriptionsParameters: { items: toUpdateItems() } })
      .unwrap()
      .catch((error: Error) => {
        trackError(new ApiError(error))
      })
    // The draft re-seeds from the response, so the server's normalisation wins over the
    // optimistic local view rather than the two drifting apart.
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
                {/* Promises only what the screen delivers: with no channel beyond the pop-up
                    there is nothing to "add on top", so the copy adapts. */}
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
