import React from "react";
import { AssetsTab, AssetsTabProps } from "../../components/tab-panel/components/assets-tab/assets-tab";
import { DynamicTypeAbstractGDPRProvider } from "./dynamic-type-abstract-gdpr-provider";
import { GDPRProviderTabProps } from "../../components/tab-panel/tab-panel";

export class DynamicTypeAssetsGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'assets'

  getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element {
    return <AssetsTab {...(tabProps as unknown as AssetsTabProps)} />
  }
}