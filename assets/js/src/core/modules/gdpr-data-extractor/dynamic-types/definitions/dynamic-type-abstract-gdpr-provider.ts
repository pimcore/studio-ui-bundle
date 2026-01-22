import { DynamicTypeAbstract } from "@sdk/modules/element";
import { injectable } from "inversify";
import { GDPRProviderTabProps } from "../../components/tab-panel/tab-panel";

@injectable()
export abstract class DynamicTypeAbstractGDPRProvider implements DynamicTypeAbstract {
  abstract readonly id: string;

  abstract getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element;
}