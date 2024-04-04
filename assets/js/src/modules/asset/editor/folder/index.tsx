import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { FolderTabManager } from './tab-manager/folder-tab-manager'
import { ListContainer } from './tab-manager/tabs/list/list-container'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'

export const folderEditorTabManager = new FolderTabManager()

folderEditorTabManager.register({
  children: <PreviewContainer />,
  icon: <Icon name={ 'image-05' } />,
  key: 'preview',
  label: 'folder.folder-editor-tabs.preview'
})

folderEditorTabManager.register({
  children: <ListContainer />,
  icon: <Icon name={ 'unordered-list-outlined' } />,
  key: 'list',
  label: 'folder.folder-editor-tabs.view'
})
