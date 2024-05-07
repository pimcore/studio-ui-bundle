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