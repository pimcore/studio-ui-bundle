/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface ContextMenuSlotConfig {
  name: string
  priority: Record<string, number>
}

export const contextMenuConfig = {
  documentTree: {
    name: 'document.tree',
    priority: {
      addFolder: 100,
      addPage: 110,
      addSnippet: 120,
      addLink: 130,
      addEmail: 140,
      addHardlink: 150,
      rename: 200,
      copy: 300,
      paste: 400,
      cut: 500,
      publish: 600,
      unpublish: 700,
      delete: 800,
      openInNewWindow: 850,
      refreshTree: 900
    }
  },

  documentEditorToolbar: {
    name: 'document.editor.toolbar',
    priority: {
      unpublish: 100,
      delete: 200,
      rename: 300,
      translations: 400,
      openInNewWindow: 500,
      openPreviewInNewWindow: 550
    }
  },

  assetTree: {
    name: 'asset.tree',
    priority: {
      addFolder: 100,
      upload: 110,
      zipUpload: 120,
      rename: 200,
      copy: 300,
      paste: 400,
      cut: 500,
      delete: 600,
      download: 700,
      zipDownload: 750,
      refreshTree: 800
    }
  },

  dataObjectTree: {
    name: 'data-object.tree',
    priority: {
      addFolder: 100,
      addObject: 110,
      rename: 200,
      copy: 300,
      paste: 400,
      cut: 500,
      delete: 600,
      refreshTree: 700
    }
  }
}