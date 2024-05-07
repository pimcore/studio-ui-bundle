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
interface IImageZoom {
    zoom: number;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    zoomSteps?: number;
}
export declare const ImageZoom: ({ zoom, setZoom, zoomSteps }: IImageZoom) => React.JSX.Element;
export {};
//# sourceMappingURL=image-zoom.d.ts.map