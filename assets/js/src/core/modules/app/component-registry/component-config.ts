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
import { EditorToolbarContextMenu as AssetEditorToolbarContextMenu } from '@Pimcore/modules/asset/editor/toolbar/context-menu/context-menu'
import { EditorToolbarContextMenu as DataObjectEditorToolbarContextMenu } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/context-menu'
import { ConditionalLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/conditional-language-selection'
import { MainNav } from '@Pimcore/modules/app/nav/main-nav'
import { Search } from '@Pimcore/modules/search/search'
import { EditorToolbarWorkflowMenu } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-menu'
import { EditorToolbarSaveButton as AssetEditorToolbarSaveButton } from '@Pimcore/modules/asset/editor/toolbar/save-button/save-button'
import { EditorToolbarSaveButtons as DataObjectEditorToolbarSaveButtons } from '@Pimcore/modules/data-object/editor/toolbar/save-buttons/save-buttons'

const defaultComponentConfig = {
  asset: {
    editor: {
      container: { type: ComponentType.SINGLE, name: 'asset.editor.container' },
      tab: {
        customMetadata: { type: ComponentType.SINGLE, name: 'asset.editor.tab.customMetadata' },
        embeddedMetadata: { type: ComponentType.SINGLE, name: 'asset.editor.tab.embeddedMetadata' },
        versions: { type: ComponentType.SINGLE, name: 'asset.editor.tab.versions' }
      },
      toolbar: {
        slots: {
          left: {
            type: ComponentType.SLOT,
            name: 'asset.editor.toolbar.slots.left',
            defaultEntries: [
              { name: 'contextMenu', priority: 100, component: AssetEditorToolbarContextMenu }
            ]
          },
          right: {
            type: ComponentType.SLOT,
            name: 'asset.editor.toolbar.slots.right',
            defaultEntries: [
              { name: 'workflowMenu', priority: 100, component: EditorToolbarWorkflowMenu },
              { name: 'saveButton', priority: 200, component: AssetEditorToolbarSaveButton }
            ]
          }
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
        slots: {
          left: {
            type: ComponentType.SLOT,
            name: 'dataObject.editor.toolbar.slots.left',
            defaultEntries: [
              { name: 'contextMenu', priority: 100, component: DataObjectEditorToolbarContextMenu },
              { name: 'languageSelection', priority: 200, component: ConditionalLanguageSelection }
            ]
          },
          right: {
            type: ComponentType.SLOT,
            name: 'dataObject.editor.toolbar.slots.right',
            defaultEntries: [
              { name: 'workflowMenu', priority: 100, component: EditorToolbarWorkflowMenu },
              { name: 'saveButtons', priority: 200, component: DataObjectEditorToolbarSaveButtons }
            ]
          }
        }
      }
    },
    tree: {
      contextMenu: { type: ComponentType.SINGLE, name: 'dataObject.tree.contextMenu' }
    }
  },
  leftSidbar: {
    slot: {
      type: ComponentType.SLOT,
      name: 'leftSidebar.slot',
      defaultEntries: [
        { name: 'mainNav', priority: 100, component: MainNav },
        { name: 'search', priority: 200, component: Search }
      ]
    }
  },
  wysiwyg: {
    editor: { type: ComponentType.SINGLE, name: 'wysiwyg.editor' }
  }
}

export const componentConfig: ComponentRegistryConfig & typeof defaultComponentConfig = {
  ...defaultComponentConfig
}
