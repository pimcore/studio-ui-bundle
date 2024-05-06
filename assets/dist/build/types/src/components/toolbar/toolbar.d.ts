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
import React, { type ReactNode } from 'react';
export interface PinnableToolbarElement {
    iconName: string;
    label: string;
    pinning?: boolean;
    displayingArrowIcon?: boolean;
    onClick?: (e: any) => void;
}
interface ToolbarProps {
    renderSaveButton: ReactNode;
    pinnableToolbarElements?: PinnableToolbarElement[];
}
export declare const Toolbar: ({ renderSaveButton, pinnableToolbarElements }: ToolbarProps) => React.JSX.Element;
export {};
//# sourceMappingURL=toolbar.d.ts.map