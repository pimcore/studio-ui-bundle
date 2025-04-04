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
import { ComponentType } from './enums/component-type'

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
          left: 'asset.editor.toolbar.slots.left',
          right: 'asset.editor.toolbar.slots.right'
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
} as const

export const componentConfig: Record<string, ComponentRegistryConfigEntry> = {
  [componentId.asset.editor.tab.customMetadata]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.tab.embeddedMetadata]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.tab.versions]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.toolbar.contextMenu]: { type: ComponentType.SINGLE },
  [componentId.asset.editor.toolbar.slots.left]: { type: ComponentType.SLOT },
  [componentId.asset.editor.toolbar.slots.right]: { type: ComponentType.SLOT },
  [componentId.asset.tree.contextMenu]: { type: ComponentType.SINGLE },
  [componentId.dataObject.editor.toolbar.contextMenu]: { type: ComponentType.SINGLE },
  [componentId.dataObject.tree.contextMenu]: { type: ComponentType.SINGLE }
} as const

export const defaultSlotEntries: Record<string, Record<string, { name: string, priority: number }>> = {
  [componentId.asset.editor.toolbar.slots.left]: {
    contextMenu: { name: 'contextMenu', priority: 100 }
  },
  [componentId.asset.editor.toolbar.slots.right]: {
    workflows: { name: 'workflows', priority: 100 },
    primaryButton: { name: 'primaryButton', priority: 200 },
    secondaryButton: { name: 'secondaryButton', priority: 300 }
  }
} as const
