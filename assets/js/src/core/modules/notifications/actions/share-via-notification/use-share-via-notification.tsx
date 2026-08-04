/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { type ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { SendNotificationModal } from '@Pimcore/modules/notifications/send-notification/send-notification-modal'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export interface UseShareViaNotificationReturn {
  shareViaNotificationContextMenuItem: ItemType
  shareViaNotificationModal: React.JSX.Element
}

export const useShareViaNotification = (
  attachment: ManyToOneRelationValue | undefined
): UseShareViaNotificationReturn => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const shareViaNotificationContextMenuItem: ItemType = {
    label: t('element.share-via-notification'),
    key: ContextMenuActionName.shareViaNotification,
    icon: <Icon value={ 'notes-events' } />,
    hidden: !isAllowed(UserPermission.SendNotifications) || attachment === undefined,
    onClick: () => {
      setIsOpen(true)
    }
  }

  const shareViaNotificationModal = (
    <SendNotificationModal
      initialAttachment={ attachment }
      onClose={ () => { setIsOpen(false) } }
      open={ isOpen }
    />
  )

  return {
    shareViaNotificationContextMenuItem,
    shareViaNotificationModal
  }
}
