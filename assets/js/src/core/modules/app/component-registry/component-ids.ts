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

import { type ComponentRegistryConfigEntry } from './component-registry'

export enum ComponentType {
  SINGLE = 'single',
  SLOT = 'slot'
}

// Restructured componentId to only contain strings
export const componentId = {
  asset: {
    editor: {
      tab: {
        customMetadata: 'asset.editor.tab.customMetadata',
        embeddedMetadata: 'asset.editor.tab.embeddedMetadata',
        versions: 'asset.editor.tab.versions'
      },
      toolbar: {
        contextMenu: 'asset.editor.toolbar.contextMenu',
        slots: {
          beforeContextMenu: 'asset.editor.toolbar.slots.beforeContextMenu',
          afterContextMenu: 'asset.editor.toolbar.slots.afterContextMenu'
        }
      }
    },
    tree: {
      contextMenu: 'asset.tree.contextMenu'
    }
  },
  dataObject: {
    editor: {
      toolbar: {
        contextMenu: 'dataObject.editor.toolbar.contextMenu'
      }
    },
    tree: {
      contextMenu: 'dataObject.tree.contextMenu'
    }
  }
}

export const componentConfig: Record<string, ComponentRegistryConfigEntry> = {
  [componentId.asset.editor.tab.customMetadata]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.tab.embeddedMetadata]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.tab.versions]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.toolbar.contextMenu]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.toolbar.slots.beforeContextMenu]: { type: ComponentType.SLOT },
  [componentId.asset.editor.toolbar.slots.afterContextMenu]: { type: ComponentType.SLOT },
  [componentId.asset.tree.contextMenu]: { type: ComponentType.SINGLE },
  [componentId.dataObject.editor.toolbar.contextMenu]: { type: ComponentType.SINGLE },
  [componentId.dataObject.tree.contextMenu]: { type: ComponentType.SINGLE }
}
