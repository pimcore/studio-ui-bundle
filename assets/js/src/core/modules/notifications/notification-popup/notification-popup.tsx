/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef } from 'react'
import { useGlobalMessageBus } from '@Pimcore/modules/global-message-bus/hooks/use-global-message-bus'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { NotificationMessageHandler } from './handlers/notification-message-handler'

export const NotificationPopup = (): React.JSX.Element => {
    const globalMessageBus = useGlobalMessageBus()
    const [notificationApi] = useNotification()
    const openNotificationsRef = useRef<any[]>([])

    useEffect(() => {
        const handler = new NotificationMessageHandler(notificationApi, openNotificationsRef)

        globalMessageBus.registerHandler(handler)

        return () => {
            globalMessageBus.unregisterHandler(handler.getId())
        }
    }, [notificationApi, globalMessageBus])

    return <></>
}