import React from "react";
import { UsersTab, UsersTabProps } from "../../components/tab-panel/components/users-tab/users-tab";
import { DynamicTypeAbstractGDPRProvider } from "./dynamic-type-abstract-gdpr-provider";

export class DynamicTypeUsersGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'pimcore_users'

  getTabContent(tabProps: UsersTabProps): React.JSX.Element {
    return <UsersTab {...tabProps} />
  }
}