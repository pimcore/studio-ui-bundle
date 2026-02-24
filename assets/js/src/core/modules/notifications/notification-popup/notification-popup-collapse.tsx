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
import {AnimatePresence, motion} from "framer-motion"
import {NotificationPopupItem} from "./notification-popup-item"
import {Collapse} from "@Pimcore/components/collapse/collapse"
import {Button} from '@sdk/components'
import {openMainWidget} from "@Pimcore/modules/widget-manager/widget-manager-slice"
import {useTranslation} from "react-i18next"
import {useAppDispatch} from "@sdk/app"
import {useStyles} from "./notification-popup.styles"

export interface OpenNotification {
    id: number
    title: string
    sender: string | null,
}

interface NotificationPopupCollapseProps {
    notifications: OpenNotification[],
    onView: (id?) => void
}

export const NotificationPopupCollapse: React.FC<NotificationPopupCollapseProps> = ({ notifications, onView }) => {
    const { t } = useTranslation()
    const {styles} = useStyles()
    const dispatch = useAppDispatch()
    const reversedNotifications = [...notifications].reverse()

    const item = {
        key: '1',
        label: <>{reversedNotifications.length === 1 ? t('notifications.new-notifications.title.single') : t('notifications.new-notifications.title')}</>,
        extra: (
            <Button
                onClick={(evt) => {
                    evt.stopPropagation();
                    onView();

                    dispatch(openMainWidget({
                            component: 'notifications',
                            name: 'Notifications',
                            id: 'notifications',
                            config: {
                                translationKey: 'notifications.label',
                                icon: {
                                    type: 'name',
                                    value: 'notification-read'
                                }
                            }
                        }))
                }}
                type='link'
                className={styles.notificationPopupButton}
            >
                {t('notifications.new-notifications.show')}
            </Button>
        ),
        children: (
            <AnimatePresence>
                {reversedNotifications.map((notification) => (
                    <motion.div
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 1 }}
                        initial={{ opacity: 0, height: 1 }}
                        key={notification.id}
                    >
                        <NotificationPopupItem
                            notification={notification} onView={() => {
                                onView(notification.id);

                            dispatch(openMainWidget({
                                component: 'notifications',
                                name: 'Notifications',
                                id: 'notifications',
                                config: {
                                    translationKey: 'notifications.label',
                                    icon: {
                                        type: 'name',
                                        value: 'notification-read'
                                    },
                                    activeNotification: notification.id
                                }
                            }))
                        }}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        ),
        ...(notifications.length === 0 && { disabled: true })
    }

    return (
        <Collapse
            className={styles.notificationPopup}
            bordered={false}
            hasContentSeparator={false}
            items={[item]}
            contentPadding={0}
        />
    )
}
