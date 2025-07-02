import { Icon } from "@Pimcore/components/icon/icon";
import { ApplicationLoggerSidebarManager } from "./application-logger-sidebar-manager";
import { FilterTabContainer } from "./tabs/filter/filter-tab-container";
import React from "react";

export const sidebarManager = new ApplicationLoggerSidebarManager();

sidebarManager.registerEntry({
  key: 'filter',
  icon: <Icon
    options={{ width: '16px', height: '16px' }}
    value={'filter'}
  />,
  component: <FilterTabContainer />
})