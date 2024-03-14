import {AssetEditorSidebarManager} from "@Pimcore/modules/asset/types/image/sidebar/AssetEditorSidebarManager";
import {Icon} from "@Pimcore/components/icon/icon";
import React from "react";
import {AssetEditorSidebarDetailsTab} from "@Pimcore/modules/asset/types/image/sidebar/tabs/details";

export const sidebarManager = new AssetEditorSidebarManager();

sidebarManager.registerEntry({
    key: 'details',
    icon: <Icon name={'view-details'} options={{ width: '16px', height: '16px' }}/>,
    component: <AssetEditorSidebarDetailsTab />
})
