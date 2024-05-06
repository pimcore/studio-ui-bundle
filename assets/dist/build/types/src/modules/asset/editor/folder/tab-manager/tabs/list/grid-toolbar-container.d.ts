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
interface GridToolbarContainerProps {
    pager: {
        total: number;
        pageSize: number;
        current: number;
        onChange: (page: number, pageSize: number) => void;
    };
}
declare const GridToolbarContainer: (props: GridToolbarContainerProps) => React.JSX.Element;
export { GridToolbarContainer };
//# sourceMappingURL=grid-toolbar-container.d.ts.map