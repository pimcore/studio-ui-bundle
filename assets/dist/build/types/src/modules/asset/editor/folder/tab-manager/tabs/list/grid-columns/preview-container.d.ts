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
import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen';
import { type CellContext } from '@tanstack/react-table';
import React from 'react';
interface PreviewContainerProps {
    cellInfo: CellContext<Asset, string | undefined> | undefined;
}
declare const PreviewContainer: (props: PreviewContainerProps) => React.JSX.Element;
export { PreviewContainer };
//# sourceMappingURL=preview-container.d.ts.map