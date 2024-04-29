import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type FolderTabManager } from './tab-manager/folder-tab-manager'
import { ListContainer } from './tab-manager/tabs/list/list-container'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'

export const folderEditorTabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

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
