import { type Asset } from '@Pimcore/modules/asset/asset-api-slice.gen';
import { type CellContext } from '@tanstack/react-table';
import React from 'react';
interface PreviewContainerProps {
    cellInfo: CellContext<Asset, string | undefined> | undefined;
}
declare const PreviewContainer: (props: PreviewContainerProps) => React.JSX.Element;
export { PreviewContainer };
//# sourceMappingURL=preview-container.d.ts.map