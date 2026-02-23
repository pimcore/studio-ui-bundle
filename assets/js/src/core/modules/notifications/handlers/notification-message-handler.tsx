/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractMessageHandler } from '@Pimcore/modules/global-message-bus/message-handlers/abstract-message-handler'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { isNil } from 'lodash'
import React from 'react'
import { api } from '@Pimcore/modules/notifications/notifications-slice-enhanced'
import { store } from '@Pimcore/app/store'
import { type NotificationInstance } from 'antd/es/notification/interface'
import {selectCurrentUser} from "@Pimcore/modules/auth/user/user-slice";
import {AnimatePresence, motion} from "framer-motion";
import {NotificationPopupItem} from "../notification-popup-item";

interface NotificationMessagePayload {
    unreadNotificationsCount: number
    notification: {
        id: number
        type: string
        title: string
        read: boolean
        creationDate: number
        recipient: number
        sender: string | null
    }
}

interface OpenNotification {
    id: number
    title: string
    sender: string | null
}

export class NotificationMessageHandler extends AbstractMessageHandler {
    private readonly MAX_NOTIFICATIONS = 3
    private readonly POPUP_KEY = 'notification-popup-group'

    constructor (
        private readonly notificationApi: NotificationInstance,
        private readonly openNotificationsRef: React.MutableRefObject<OpenNotification[]>
    ) {
        super()
    }

    shouldHandle (message: AbstractMercureMessage): boolean {
        const user = selectCurrentUser(store.getState())
        const payload = message.payload as any

        return payload?.notification?.recipient === user.id && !isNil(payload?.notification) && !isNil(payload?.unreadNotificationsCount)
    }

    private updatePopup (): void {
        const onHideItem = (id: number) => {
            this.openNotificationsRef.current = this.openNotificationsRef.current.filter((notification) => notification.id !== id)

            if (this.openNotificationsRef.current.length === 0) {
                this.notificationApi.destroy(this.POPUP_KEY)
                return
            }

            this.updatePopup()
        }

        const notifications = [...this.openNotificationsRef.current].reverse()

        const description = (
            <AnimatePresence>
                {notifications.map((notification) => (
                    <motion.div
                        animate={ { opacity: 1, height: 'auto' } }
                        exit={ { opacity: 0, height: 1 } }
                        initial={ { opacity: 0, height: 1 } }
                        key={notification.id}
                    >
                        <NotificationPopupItem notification={notification} onHideItem={() => onHideItem(notification.id)} />
                    </motion.div>
                ))}
            </AnimatePresence>
        )

        this.notificationApi.open({
            key: this.POPUP_KEY,
            message: 'Notifications',
            description,
            placement: 'bottomRight',
            duration: 0,
            closable: false
        });
    }

    async handleMessage (message: AbstractMercureMessage): Promise<void> {
        // const { styles } = useStyles()
        const payload = message.payload as NotificationMessagePayload

        if (isNil(payload.notification)) {
            return
        }

        const notificationData = payload.notification

        if (this.openNotificationsRef.current.length >= this.MAX_NOTIFICATIONS) {
            this.openNotificationsRef.current.shift()
        }

        this.openNotificationsRef.current.push({
            id:notificationData.id,
            title: notificationData.title,
            sender: notificationData.sender
        })

        this.updatePopup()

        store.dispatch(
            api.util.invalidateTags(['NOTIFICATIONS'])
        )

        store.dispatch(
            api.util.updateQueryData(
                'notificationGetUnreadCount',
                undefined,
                () => ({ unreadNotificationsCount: payload.unreadNotificationsCount })
            )
        )
    }

    getId (): string {
        return 'notification-popup-handler'
    }
}