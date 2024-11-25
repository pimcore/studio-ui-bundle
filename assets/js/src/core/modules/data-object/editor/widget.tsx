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

import { EditorContainer, type EditorContainerProps } from '@Pimcore/modules/data-object/editor/editor-container'
import { TitleContainer } from '@Pimcore/modules/data-object/editor/title/title-container'
import { store } from '@Pimcore/app/store'
import React from 'react'
import { type Widget } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { DataObjectProvider } from '@Pimcore/modules/data-object/data-object-provider'
import { selectDataObjectById } from '@Pimcore/modules/data-object/data-object-draft-slice'
import { type GlobalDataObjectContext } from '@Pimcore/modules/data-object/hooks/use-global-data-object-context'

export const DataObjectEditorWidget: Widget = {
  name: 'data-object-editor',
  component: EditorContainer,
  titleComponent: TitleContainer,
  isModified: (tabNode) => {
    const config = tabNode.getConfig() as EditorContainerProps
    const dataObject = selectDataObjectById(store.getState(), config.id)
    return dataObject?.modified ?? false
  },
  getContextProvider: (context: GlobalDataObjectContext, children) => {
    const config = context.config
    return (
      <DataObjectProvider id={ config.id }>
        {children}
      </DataObjectProvider>
    )
  }
}
