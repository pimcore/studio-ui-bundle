import React from 'react';
import { type DropdownMenuItemProps } from '../dropdown-menu/dropdown-menu';
export declare enum SizeTypes {
    SMALL = "small",
    MEDIUM = "medium"
}
interface PreviewCardProps {
    name: string;
    dropdownItems: DropdownMenuItemProps[];
    imgSrc?: string;
    size?: SizeTypes;
    onClick?: (e: any) => void;
}
export declare const PreviewCard: ({ name, dropdownItems, imgSrc, size, onClick }: PreviewCardProps) => React.JSX.Element;
export {};
//# sourceMappingURL=preview-card.d.ts.map