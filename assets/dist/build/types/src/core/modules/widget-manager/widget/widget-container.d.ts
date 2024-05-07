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
import React, { type ComponentType } from 'react';
import { type TabNode } from 'flexlayout-react';
interface WidgetContainerProps {
    node: TabNode;
    component: ComponentType;
}
interface IWidgetContext {
    nodeId: string | null;
}
export declare const WidgetContext: React.Context<IWidgetContext>;
declare const WidgetContainer: (props: WidgetContainerProps) => React.JSX.Element;
export { WidgetContainer };
//# sourceMappingURL=widget-container.d.ts.map