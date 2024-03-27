import {message} from "antd";
import {ArgsProps, ConfigOptions, MessageType, TypeOpen} from "antd/es/message/interface";
import {Icon} from "@Pimcore/components/icon/icon";
import React from "react";

export const useMessage = (messageConfig?: ConfigOptions) => {
    const [messageApi, contextHolder] = message.useMessage(messageConfig);

    messageApi.open = (config: ArgsProps): MessageType => {
        if(config.type === 'info') {
            return message.open({
                icon: <Icon name={'info-circle-filled'} options={{width: '16px', height: '16px'}} />,
                ...config
            });
        }

        return message.open(config);
    }

    return [messageApi, contextHolder];
}
