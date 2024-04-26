import React from 'react';
export interface TreeNodeProps {
    id: string;
    icon: string;
    label: string;
    internalKey: string;
    children: TreeNodeProps[];
    level: number;
    hasChildren?: boolean;
    metaData?: any;
}
declare const TreeNode: {
    (props: TreeNodeProps): React.JSX.Element;
    defaultProps: TreeNodeProps;
};
export { TreeNode };
//# sourceMappingURL=tree-node.d.ts.map