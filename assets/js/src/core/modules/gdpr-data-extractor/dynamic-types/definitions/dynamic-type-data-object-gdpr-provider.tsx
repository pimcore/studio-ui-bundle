import React from "react";
import { DataObjectsTab, DataObjectsTabProps } from "../../components/tab-panel/components/data-objects-tab/data-objects-tab";
import { DynamicTypeAbstractGDPRProvider } from "./dynamic-type-abstract-gdpr-provider";
import { GDPRProviderTabProps } from "../../components/tab-panel/tab-panel";

export class DynamicTypeDataObjectGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'data_objects'

  getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element {
    return <DataObjectsTab {...(tabProps as unknown as DataObjectsTabProps)} />
  }
}