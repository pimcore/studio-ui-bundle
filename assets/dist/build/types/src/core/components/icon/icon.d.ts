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
declare const icons: {
    camera: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    folder: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'widget-default': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'chevron-up-small': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'chevron-down-small': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'chevron-up-wide': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'chevron-down-wide': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    home: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    refresh: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'icon-tools': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'image-05': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    edit: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'data-sheet': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'data-management-2': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'history-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'schedule-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    hierarchy: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'view-details': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'tag-two-tone': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    workflow: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'unordered-list-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'close-circle-filled': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'check-circle-filled': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'info-circle-filled': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'exclamation-circle-filled': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'dots-horizontal': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    target: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'info-circle-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'right-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'rich-edit': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'download-02': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'delete-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'pin-02': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'edit-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'expand-alt-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'eye-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'share-alt-outlined': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    translation: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'volume-max': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'file-code-01': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'file-question-02': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'file-02': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'file-check-02': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'file-x-03': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'presentation-chart-01': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'video-recorder': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'image-01': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    'focal-point': React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    MinusOutlined: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
    PlusOutlined: React.LazyExoticComponent<React.FC<React.SVGProps<SVGSVGElement>>>;
};
export interface IconProps {
    name: keyof typeof icons | string;
    options?: React.SVGProps<SVGSVGElement>;
    className?: string;
}
export declare const Icon: ({ name, options, className }: IconProps) => React.JSX.Element;
export {};
//# sourceMappingURL=icon.d.ts.map