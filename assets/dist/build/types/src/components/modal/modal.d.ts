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