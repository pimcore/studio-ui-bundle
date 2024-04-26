import { type WidgetManagerTabConfig } from '../widget-manager-slice';
interface useWidgetManagerReturn {
    openMainWidget: (tabConfig: WidgetManagerTabConfig) => void;
    openBottomWidget: (tabConfig: WidgetManagerTabConfig) => void;
    openLeftWidget: (tabConfig: WidgetManagerTabConfig) => void;
    openRightWidget: (tabConfig: WidgetManagerTabConfig) => void;
    switchToWidget: (id: string) => void;
}
export declare const useWidgetManager: () => useWidgetManagerReturn;
export {};
//# sourceMappingURL=use-widget-manager.d.ts.map