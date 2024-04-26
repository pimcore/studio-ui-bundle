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