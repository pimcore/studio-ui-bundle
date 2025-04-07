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

import { type ComponentRegistryConfig } from './component-registry'
import { ComponentType } from './enums/component-type'
import { EditorToolbarContextMenu } from '@Pimcore/modules/asset/editor/toolbar/context-menu/context-menu'

const defaultComponentConfig = {
  asset: {
    editor: {
      tab: {
        customMetadata: { type: ComponentType.SINGLE, name: 'asset.editor.tab.customMetadata' },
        embeddedMetadata: { type: ComponentType.SINGLE, name: 'asset.editor.tab.embeddedMetadata' },
        versions: { type: ComponentType.SINGLE, name: 'asset.editor.tab.versions' }
      },
      toolbar: {
        contextMenu: { type: ComponentType.SINGLE, name: 'asset.editor.toolbar.contextMenu' },
        slots: {
          left: {
            type: ComponentType.SLOT,
            name: 'asset.editor.toolbar.slots.left',
            defaultEntries: [
              { name: 'contextMenu', priority: 100, component: EditorToolbarContextMenu }
            ]
          },
          right: { type: ComponentType.SLOT, name: 'asset.editor.toolbar.slots.right' }
        }
      }
    },
    tree: {
      contextMenu: { type: ComponentType.SINGLE, name: 'asset.tree.contextMenu' }
    }
  },
  dataObject: {
    editor: {
      toolbar: {
        contextMenu: { type: ComponentType.SINGLE, name: 'dataObject.editor.toolbar.contextMenu' }
      }
    },
    tree: {
      contextMenu: { type: ComponentType.SINGLE, name: 'dataObject.tree.contextMenu' }
    }
  }
}

export const componentConfig: ComponentRegistryConfig & typeof defaultComponentConfig = {
  ...defaultComponentConfig
}
