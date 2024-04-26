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