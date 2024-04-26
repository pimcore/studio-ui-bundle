import React from 'react';
import { type TreeNodeProps } from '../node/tree-node';
export interface TreeExpanderProps {
    node: TreeNodeProps;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export declare const TreeExpander: ({ node, state }: TreeExpanderProps) => React.JSX.Element;
//# sourceMappingURL=tree-expander.d.ts.map