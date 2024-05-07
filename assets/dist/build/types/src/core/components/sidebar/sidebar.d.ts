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
import { type ISidebarButton, type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager';
interface SidebarProps {
    entries: ISidebarEntry[];
    buttons?: ISidebarButton[];
}
export declare const Sidebar: ({ entries, buttons }: SidebarProps) => React.JSX.Element;
export {};
//# sourceMappingURL=sidebar.d.ts.map