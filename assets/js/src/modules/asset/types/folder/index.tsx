import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { FolderEditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/folder-tab-manager'
import { ListContainer } from './editor-tabs/tabs/list-container'
import i18n from '@Pimcore/app/i18n'
import { PreviewContainer } from '@Pimcore/modules/asset/types/folder/editor-tabs/tabs/preview-container'

export const folderEditorTabManager = new FolderEditorTabManager()

folderEditorTabManager.register({
  children: <PreviewContainer />,
  icon: <Icon name={'image-05'} />,
  key: 'preview',
  label: i18n.t('folder.folder-editor-tabs.preview')
})

folderEditorTabManager.register({
  children: <ListContainer />,
  icon: <Icon name={'unordered-list-outlined'} />,
  key: 'list',
  label: 'folder.folder-editor-tabs.view'
})
