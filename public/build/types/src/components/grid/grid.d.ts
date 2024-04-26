import { type ColumnDef } from '@tanstack/react-table';
import React from 'react';
export interface GridProps {
    data: any[];
    columns: Array<ColumnDef<any>>;
    resizable?: boolean;
}
export declare const Grid: (props: GridProps) => React.JSX.Element;
//# sourceMappingURL=grid.d.ts.map