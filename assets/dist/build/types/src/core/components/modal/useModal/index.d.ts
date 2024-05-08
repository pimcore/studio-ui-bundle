/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/
import React from 'react';
import { Modal, type IModalProps } from '../../../components/modal/modal';
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