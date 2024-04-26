import { type ModalProps as AntModalProps } from 'antd';
import React from 'react';
import type useModal from 'antd/es/modal/useModal';
export interface IModalProps extends AntModalProps {
    icon?: React.JSX.Element;
    footer?: React.JSX.Element;
    useModal?: typeof useModal;
    children: React.ReactNode;
}
export declare const Modal: (props: IModalProps) => React.JSX.Element;
//# sourceMappingURL=modal.d.ts.map