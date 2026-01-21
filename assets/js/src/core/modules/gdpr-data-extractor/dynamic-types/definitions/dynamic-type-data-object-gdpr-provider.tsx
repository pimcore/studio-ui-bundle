import React from "react";
import { DataObjectsTab, DataObjectsTabProps } from "../../components/tab-panel/components/data-objects-tab/data-objects-tab";
import { DynamicTypeAbstractGDPRProvider } from "./dynamic-type-abstract-gdpr-provider";

export class DynamicTypeDataObjectGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'data_objects'

  getTabContent(tabProps: DataObjectsTabProps): React.JSX.Element {
    return <DataObjectsTab {...tabProps} />
  }
}