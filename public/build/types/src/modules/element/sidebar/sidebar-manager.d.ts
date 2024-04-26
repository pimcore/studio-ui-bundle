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