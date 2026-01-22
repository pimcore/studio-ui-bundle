import React from "react";
import { UsersTab, UsersTabProps } from "../../components/tab-panel/components/users-tab/users-tab";
import { DynamicTypeAbstractGDPRProvider } from "./dynamic-type-abstract-gdpr-provider";
import { GDPRProviderTabProps } from "../../components/tab-panel/tab-panel";

export class DynamicTypeUsersGDPRProvider extends DynamicTypeAbstractGDPRProvider {
  readonly id: string = 'pimcore_users'

  getTabContent<T>(tabProps: GDPRProviderTabProps<T>): React.JSX.Element {
    return <UsersTab {...(tabProps as unknown as UsersTabProps)} />
  }
}