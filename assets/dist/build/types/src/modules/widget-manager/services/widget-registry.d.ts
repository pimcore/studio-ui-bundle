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