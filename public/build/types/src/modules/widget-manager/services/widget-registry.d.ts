import { type ComponentType } from 'react';
export interface Widget {
    name: string;
    component: ComponentType;
}
export declare class WidgetRegistry {
    private readonly widgets;
    registerWidget(widget: Widget): void;
    getWidget(name: string): Widget | undefined;
}
//# sourceMappingURL=widget-registry.d.ts.map