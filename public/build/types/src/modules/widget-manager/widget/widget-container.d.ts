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