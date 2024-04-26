import React, { type ElementType, type Dispatch, type MutableRefObject } from 'react';
import { type TreeNodeProps } from './node/tree-node';
import { type TreeNodeContentProps } from './node/content/tree-node-content';
export interface TreeSearchProps {
    node: TreeNodeProps;
    mergeAdditionalQueryParams?: Dispatch<unknown>;
    total: number;
}
export interface TreePagerProps {
    node: TreeNodeProps;
    mergeAdditionalQueryParams: Dispatch<unknown>;
    total: number;
}
export interface TreeProps {
    nodeId: number;
    nodeApiHook: any;
    maxItemsPerNode: number;
    renderNodeContent: ElementType<TreeNodeContentProps>;
    renderFilter?: ElementType<TreeSearchProps>;
    renderPager?: ElementType<TreePagerProps>;
    onLoad?: (node: TreeNodeProps) => Promise<void>;
    onSelect?: (node: TreeNodeProps) => void;
    onContextMenu?: (node: TreeNodeProps, event: React.MouseEvent) => void;
}
export interface nodeRef {
    el: HTMLElement;
    node: TreeNodeProps;
}
export interface ITreeContext extends TreeProps {
    selectedIdsState?: [string[], (ids: string[]) => void];
    nodesRefs?: MutableRefObject<Record<string, nodeRef>>;
    nodeOrder?: () => string[];
}
export declare const TreeContext: React.Context<ITreeContext>;
declare const Tree: {
    (props: TreeProps): React.JSX.Element;
    defaultProps: TreeProps;
};
export { Tree };
//# sourceMappingURL=tree.d.ts.map