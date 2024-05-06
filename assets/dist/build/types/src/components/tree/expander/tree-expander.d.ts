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
import { type TreeNodeProps } from '../node/tree-node';
export interface TreeExpanderProps {
    node: TreeNodeProps;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export declare const TreeExpander: ({ node, state }: TreeExpanderProps) => React.JSX.Element;
//# sourceMappingURL=tree-expander.d.ts.map