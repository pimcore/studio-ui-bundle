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
import { type Header, type Table } from '@tanstack/react-table';
interface ResizerProps {
    isResizing: boolean;
    table: Table<any>;
    header?: Header<any, any>;
}
declare const Resizer: (props: ResizerProps) => React.JSX.Element;
export { Resizer };
//# sourceMappingURL=resizer.d.ts.map