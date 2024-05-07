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
import { type ColumnDef } from '@tanstack/react-table';
import React from 'react';
export interface GridProps {
    data: any[];
    columns: Array<ColumnDef<any>>;
    resizable?: boolean;
}
export declare const Grid: (props: GridProps) => React.JSX.Element;
//# sourceMappingURL=grid.d.ts.map