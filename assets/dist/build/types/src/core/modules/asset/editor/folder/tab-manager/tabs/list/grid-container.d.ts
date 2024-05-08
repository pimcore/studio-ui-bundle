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
import { type GetAssetsApiResponse } from '../../../../../../../modules/asset/asset-api-slice.gen';
interface GridContainerProps {
    assets: GetAssetsApiResponse;
}
declare const GridContainer: (props: GridContainerProps) => React.JSX.Element;
export { GridContainer };
//# sourceMappingURL=grid-container.d.ts.map