import { notification } from "antd";
import React, { ReactNode } from "react";
import {ArgsProps} from "antd/es/notification/interface";
import {useStyle} from "@Pimcore/components/notification/notification.style";
import {Icon} from "@Pimcore/components/icon/icon";

interface INotificationConfig extends ArgsProps {
  expandable?: boolean;
  title: string;
  summary?: ReactNode;
}

export const useNotification = () => {
  const [notificationApi, contextHolder] = notification.useNotification();
  const {styles} = useStyle();

  const collapsableHeader = (config: INotificationConfig) => {
    console.log(config.summary)

    return (
      <div className={styles['notification-header']}>
        <div className={'notification-header__content'}>
          <div className={'notification-header__content_headline'}>
            <p>{config.title}</p>
            <Icon name={'chevron-down-wide'} options={{width: 22, height: 22}}/>
          </div>
          <div className={'notification-header__content__summary'}>
            {config.summary}
          </div>
        </div>
      </div>
    )
  }

  notificationApi.open = (config: INotificationConfig) => {
    const test = collapsableHeader(config);

    notification.open({
      ...config,
      message: test,
      duration: 0,
      className: styles.notification,
    });
  }

  return [notificationApi, contextHolder]
}
