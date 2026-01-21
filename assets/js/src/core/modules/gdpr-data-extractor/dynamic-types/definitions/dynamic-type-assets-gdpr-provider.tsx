import React from "react";
import { AssetsTab, AssetsTabProps } from "../../components/tab-panel/components/assets-tab/assets-tab";
import { DynamicTypeAbstractGDPRProvider } from "./dynamic-type-abstract-gdpr-provider";

export class DynamicTypeAssetsGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'assets'

  getTabContent(tabProps: AssetsTabProps): React.JSX.Element {
    return <AssetsTab {...tabProps} />
  }
}