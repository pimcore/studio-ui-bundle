import React from 'react';
import { Modal, type IModalProps } from '@Pimcore/components/modal/modal';
interface useModalReturnType {
    renderModal: (props: IModalProps) => React.JSX.Element;
    showModal: () => void;
    handleOk: () => void;
    handleCancel: () => void;
}
export declare const useModal: (config?: {
    type: string;
}) => useModalReturnType;
export declare const withError: (Component: typeof Modal) => typeof Modal;
export declare const withSuccess: (Component: typeof Modal) => typeof Modal;
export declare const withInfo: (Component: typeof Modal) => typeof Modal;
export declare const withWarn: (Component: typeof Modal) => typeof Modal;
export {};
//# sourceMappingURL=index.d.ts.map