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