import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { FolderEditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/folder-tab-manager'
import { ListContainer } from './editor-tabs/tabs/list-container'

export const folderEditorTabManager = new FolderEditorTabManager()

folderEditorTabManager.register({
  children: <ListContainer />,
  icon: <Icon name={'unordered-list-outlined'} />,
  key: 'list',
  label: 'folder.folder-editor-tabs.view'
})
