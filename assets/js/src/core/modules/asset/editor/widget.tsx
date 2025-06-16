/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type EditorContainerProps } from '@Pimcore/modules/asset/editor/editor-container'
import { TitleContainer } from '@Pimcore/modules/asset/editor/title/title-container'
import { selectAssetById } from '@Pimcore/modules/asset/asset-draft-slice'
import { store } from '@Pimcore/app/store'
import React from 'react'
import { AssetProvider } from '@sdk/modules/asset'
import { type Widget } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { type GlobalAssetContext } from '@Pimcore/modules/asset/hooks/use-global-asset-context'
import { EditorContainerRenderer } from './editor-container/editor-container-renderer'

export const AssetEditorWidget: Widget = {
  name: 'asset-editor',
  component: EditorContainerRenderer,
  titleComponent: TitleContainer,
  isModified: (tabNode) => {
    const config = tabNode.getConfig() as EditorContainerProps
    const asset = selectAssetById(store.getState(), config.id)
    return asset?.modified ?? false
  },
  getContextProvider: (context: GlobalAssetContext, children) => {
    const config = context.config
    return (
      <AssetProvider id={ config.id }>
        {children}
      </AssetProvider>
    )
  }
}
