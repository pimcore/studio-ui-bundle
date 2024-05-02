/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

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
