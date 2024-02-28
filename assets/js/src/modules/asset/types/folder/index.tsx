import React from 'react'
import { FolderEditorTabManager } from '@Pimcore/modules/editor-tab-manager/utils/folder-tab-manager'
import { Icon } from '@Pimcore/components/icon/icon'
import i18n from '@Pimcore/app/i18n'
import { ListContainer } from './editor-tabs/tabs/list-container'

export const folderEditorTabManager = new FolderEditorTabManager()

folderEditorTabManager.register({
  children: <ListContainer />,
  icon: <Icon name={'unordered-list-outlined'} />,
  key: 'list',
  label: i18n.t('folder.folder-editor-tabs.view')
})
