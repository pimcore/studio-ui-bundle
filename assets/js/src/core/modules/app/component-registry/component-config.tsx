/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ComponentRegistryConfig } from './component-registry'
import { ComponentType } from './enums/component-type'

const defaultComponentConfig = {
  global: {
    feedback: {
      type: ComponentType.SLOT,
      name: 'global.feedback'
    },
    modal: {
      type: ComponentType.SLOT,
      name: 'global.modal'
    }
  },
  asset: {
    listing: {
      toolbar: {
        component: {
          type: ComponentType.SINGLE,
          name: 'asset.listing.toolbar'
        },
        left: {
          type: ComponentType.SLOT,
          name: 'asset.listing.toolbar.left',
          defaultEntries: [
            { name: 'batch-actions', priority: 100 }
          ]
        },
        right: {
          type: ComponentType.SLOT,
          name: 'asset.listing.toolbar.right',
          defaultEntries: [
            { name: 'pagination', priority: 100 }
          ]
        }
      }
    },
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
              { name: 'contextMenu', priority: 100 }
            ]
          },
          right: {
            type: ComponentType.SLOT,
            name: 'asset.editor.toolbar.slots.right',
            defaultEntries: [
              { name: 'workflowMenu', priority: 100 },
              { name: 'saveButton', priority: 200 }
            ]
          }
        }
      }
    },
    tree: {
      contextMenu: { type: ComponentType.SINGLE, name: 'asset.tree.contextMenu' },
      tooltip: { type: ComponentType.SINGLE, name: 'asset.tree.tooltip' },
      node: {
        meta: {
          type: ComponentType.SLOT,
          name: 'asset.tree.node.meta',
          defaultEntries: [
            { name: 'lockIcon', priority: 100 }
          ]
        }
      }
    }
  },
  dataObject: {
    listing: {
      toolbar: {
        component: {
          type: ComponentType.SINGLE,
          name: 'dataObject.listing.toolbar'
        },
        left: {
          type: ComponentType.SLOT,
          name: 'dataObject.listing.toolbar.left',
          defaultEntries: [
            { name: 'batch-actions', priority: 100 }
          ]
        },
        right: {
          type: ComponentType.SLOT,
          name: 'dataObject.listing.toolbar.right',
          defaultEntries: [
            { name: 'pagination', priority: 100 }
          ]
        }
      }
    },
    editor: {
      toolbar: {
        slots: {
          left: {
            type: ComponentType.SLOT,
            name: 'dataObject.editor.toolbar.slots.left',
            defaultEntries: [
              { name: 'contextMenu', priority: 100 },
              { name: 'languageSelection', priority: 200 }
            ]
          },
          right: {
            type: ComponentType.SLOT,
            name: 'dataObject.editor.toolbar.slots.right',
            defaultEntries: [
              { name: 'workflowMenu', priority: 100 },
              { name: 'saveButtons', priority: 200 }
            ]
          }
        }
      },
      tab: {
        listing: { type: ComponentType.SINGLE, name: 'dataObject.editor.tab.listing' },
        edit: { type: ComponentType.SINGLE, name: 'dataObject.editor.tab.edit' },
        preview: { type: ComponentType.SINGLE, name: 'dataObject.editor.tab.preview' },
        versions: { type: ComponentType.SINGLE, name: 'dataObject.editor.tab.versions' },
        variants: { type: ComponentType.SINGLE, name: 'dataObject.editor.tab.variants' }
      }
    },
    tree: {
      contextMenu: { type: ComponentType.SINGLE, name: 'dataObject.tree.contextMenu' },
      tooltip: { type: ComponentType.SINGLE, name: 'dataObject.tree.tooltip' },
      node: {
        meta: {
          type: ComponentType.SLOT,
          name: 'dataObject.tree.node.meta',
          defaultEntries: [
            { name: 'lockIcon', priority: 100 }
          ]
        }
      }
    }
  },
  document: {
    editor: {
      container: { type: ComponentType.SINGLE, name: 'document.editor.container' },
      toolbar: {
        slots: {
          left: {
            type: ComponentType.SLOT,
            name: 'document.editor.toolbar.slots.left',
            defaultEntries: [
              { name: 'contextMenu', priority: 100 }
            ]
          },
          right: {
            type: ComponentType.SLOT,
            name: 'document.editor.toolbar.slots.right',
            defaultEntries: [
              { name: 'workflowMenu', priority: 100 },
              { name: 'saveButtons', priority: 200 }
            ]
          }
        }
      }
    },
    tree: {
      contextMenu: { type: ComponentType.SINGLE, name: 'document.tree.contextMenu' },
      tooltip: { type: ComponentType.SINGLE, name: 'document.tree.tooltip' },
      node: {
        meta: {
          type: ComponentType.SLOT,
          name: 'document.tree.node.meta',
          defaultEntries: [
            { name: 'navigationExcludeIcon', priority: 100 },
            { name: 'lockIcon', priority: 200 }
          ]
        }
      }
    }
  },
  element: {
    editor: {
      tab: {
        properties: { type: ComponentType.SINGLE, name: 'element.editor.tab.properties' },
        schedule: { type: ComponentType.SINGLE, name: 'element.editor.tab.schedule' },
        dependencies: { type: ComponentType.SINGLE, name: 'element.editor.tab.dependencies' },
        workflow: { type: ComponentType.SINGLE, name: 'element.editor.tab.workflow' },
        notesAndEvents: { type: ComponentType.SINGLE, name: 'element.editor.tab.notesAndEvents' },
        tags: { type: ComponentType.SINGLE, name: 'element.editor.tab.tags' }
      }
    }
  },
  leftSidebar: {
    slot: {
      type: ComponentType.SLOT,
      name: 'leftSidebar.slot',
      defaultEntries: [
        { name: 'mainNav', priority: 100 },
        { name: 'search', priority: 200 }
      ]
    }
  },
  rightSidebar: {
    slot: {
      type: ComponentType.SLOT,
      name: 'rightSidebar.slot',
      defaultEntries: [
        { name: 'logoContainer', priority: 100 }
      ]
    },
    logo: {
      image: {
        type: ComponentType.SINGLE,
        name: 'rightSidebar.logo.image'
      },
      subscriptionDetails: {
        type: ComponentType.SINGLE,
        name: 'rightSidebar.logo.subscriptionDetails'
      }
    }
  },
  wysiwyg: {
    editor: { type: ComponentType.SINGLE, name: 'wysiwyg.editor' }
  },
  form: {
    login: {
      type: ComponentType.SLOT,
      name: 'form.login'
    }
  }
}

export const componentConfig: ComponentRegistryConfig & typeof defaultComponentConfig = {
  ...defaultComponentConfig
}
