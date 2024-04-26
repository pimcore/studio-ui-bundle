import { type DropdownProps } from 'antd';
import React, { type ReactElement } from 'react';
export interface DropdownMenuItemProps {
    iconLeft: string;
    label: string;
    onClick?: (e: any) => void;
    iconToLabel?: IconProps;
    iconRight?: IconProps;
}
export interface IconProps {
    name: string;
    className?: string;
    onClick?: (e: any) => void;
}
interface DropdownMenuProps extends React.PropsWithChildren {
    children: ReactElement;
    placement: DropdownProps['placement'];
    dropdownItems: DropdownMenuItemProps[];
    openClassName?: string;
}
export declare const DropdownMenu: ({ children, placement, dropdownItems, openClassName }: DropdownMenuProps) => React.JSX.Element;
export {};
//# sourceMappingURL=dropdown-menu.d.ts.map