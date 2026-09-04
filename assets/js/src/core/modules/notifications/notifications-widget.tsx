/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Tabs, type ITabsProps } from '@Pimcore/components/tabs/tabs'
import { Flex } from '@Pimcore/components/flex/flex'
import { Title } from '@Pimcore/components/title/title'
import { Header, IconTextButton } from '@sdk/components'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { NotificationsContainer } from './notifications-container'
import { NotificationSettingsContainer } from './settings/notification-settings-container'
import { SendNotificationModal } from './send-notification/send-notification-modal'
import {
  clearNotificationsSectionRequest,
  selectSectionRequest,
  type NotificationsSection
} from './notifications-ui-slice'

interface NotificationsWidgetProps {
  activeNotification?: number
}

/**
 * The Notifications widget: the inbox and the subscription preferences as two sections of one
 * screen.
 *
 * Only the title and "send" live out here. Each section renders its own ContentLayout, because
 * their toolbars have nothing in common — the inbox pages and clears, settings saves and discards
 * — and the filter sidebar belongs to the inbox alone.
 */
export const NotificationsWidget = ({ activeNotification }: NotificationsWidgetProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const sectionRequest = useAppSelector(selectSectionRequest)
  const [sendModal, setSendModal] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<NotificationsSection>('inbox')

  // Deep link from elsewhere in the app (the user menu's gear). An already-open widget keeps its
  // original config, so a section cannot be requested through it — this signal is read live.
  useEffect(() => {
    if (sectionRequest !== null) {
      setActiveSection(sectionRequest.section)
      dispatch(clearNotificationsSectionRequest())
    }
  }, [sectionRequest, dispatch])

  const items: ITabsProps['items'] = [
    {
      key: 'inbox',
      label: t('notifications.tab.inbox'),
      children: <NotificationsContainer activeNotification={ activeNotification } />
    },
    {
      key: 'settings',
      label: t('notifications.tab.settings'),
      children: <NotificationSettingsContainer />
    }
  ]

  return (
    <ContentLayout
      renderTopBar={
        // Bottom padding dropped so the title sits tight against its own section tabs — Box applies
        // `padding` inline, so this affects only this header, not the shared component.
        <Header padding={ { bottom: 'none' } }>
          <Flex gap='extra-small'>
            <Title>{t('notifications.label')}</Title>
            {isAllowed(UserPermission.SendNotifications) && (
              <IconTextButton
                data-testid="notifications-send-button"
                icon={ { value: 'send-03' } }
                onClick={ () => { setSendModal(true) } }
              >{t('user-menu.notification.send')}</IconTextButton>
            )}
          </Flex>
        </Header>
        }
    >
      {/* Panes stay mounted: switching sections must not silently drop an unsaved settings draft. */}
      <Tabs
        activeKey={ activeSection }
        fullHeight
        items={ items }
        onChange={ (key) => { setActiveSection(key as NotificationsSection) } }
      />

      <SendNotificationModal
        onClose={ () => { setSendModal(false) } }
        open={ sendModal }
      />
    </ContentLayout>
  )
}
