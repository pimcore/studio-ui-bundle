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
import type React from 'react';
export interface ISidebarEntry {
    key: string;
    icon: React.JSX.Element;
    component: React.JSX.Element;
}
export interface ISidebarButton {
    key: string;
    icon: React.JSX.Element;
    onClick: () => void;
}
export declare abstract class SidebarManager {
    entries: ISidebarEntry[];
    buttons: ISidebarButton[];
    getEntries(): ISidebarEntry[];
    getEntry(key: string): ISidebarEntry | undefined;
    registerEntry(entry: ISidebarEntry): void;
    getButtons(): ISidebarButton[];
    getButton(key: string): ISidebarButton | undefined;
    registerButton(button: ISidebarButton): void;
}
//# sourceMappingURL=sidebar-manager.d.ts.map