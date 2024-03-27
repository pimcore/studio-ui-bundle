import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import { PureContentProps } from "antd/es/message/PurePanel";
import classNames from 'classnames';
import React from "react";
import {Icon} from "@Pimcore/components/icon/icon";

export const TypeIcon = {
    info: <Icon name={'info-circle-filled'} options={{width: '16px', height: '16px'}} />,
    success: <CheckCircleFilled />,
    error: <CloseCircleFilled />,
    warning: <ExclamationCircleFilled />,
    loading: <LoadingOutlined />,
};


export const PureContent: React.FC<PureContentProps> = ({ prefixCls, type, icon, children }) => (
    <div className={classNames(`${prefixCls}-custom-content`, `${prefixCls}-${type}`)}>
        {icon || TypeIcon[type!]}
        <span>{children}</span>
    </div>
);
