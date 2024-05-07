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
interface IActions {
    key: number;
    description: string;
    progress: number;
    progressDetail: string;
    completed: boolean;
    completedAction?: ReactNode;
    cancel: () => void;
}
export interface IActionListProps {
    actions: IActions[];
}
export declare const ActionList: ({ actions }: IActionListProps) => React.JSX.Element;
export {};
//# sourceMappingURL=action-list.d.ts.map