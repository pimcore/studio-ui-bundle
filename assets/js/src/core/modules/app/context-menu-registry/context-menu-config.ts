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
      pasteInheritance: 410,
      cut: 500,
      pasteCut: 510,
      publish: 600,
      unpublish: 700,
      delete: 800,
      openInNewWindow: 850,
      advanced: 870,
      refreshTree: 900
    }
  },

  documentTreeAdvanced: {
    name: 'document.tree.advanced',
    priority: {
      convertTo: 100,
      lock: 200,
      useAsSite: 300,
      editSite: 310,
      removeSite: 320
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

  dataObjectEditorToolbar: {
    name: 'data-object.editor.toolbar',
    priority: {
      unpublish: 100,
      delete: 200,
      rename: 300
    }
  },

  assetEditorToolbar: {
    name: 'asset.editor.toolbar',
    priority: {
      rename: 100,
      delete: 200,
      download: 300,
      zipDownload: 400,
      clearImageThumbnail: 500,
      clearVideoThumbnail: 600,
      clearPdfThumbnail: 700
    }
  },

  assetTree: {
    name: 'asset.tree',
    priority: {
      newAssets: 100,
      addFolder: 120,
      rename: 200,
      copy: 300,
      paste: 400,
      cut: 500,
      pasteCut: 510,
      delete: 800,
      createZipDownload: 850,
      uploadNewVersion: 860,
      download: 870,
      advanced: 880,
      refreshTree: 900
    }
  },

  dataObjectTree: {
    name: 'data-object.tree',
    priority: {
      addObject: 100,
      addVariant: 110,
      addFolder: 120,
      rename: 200,
      copy: 300,
      paste: 400,
      cut: 500,
      pasteCut: 510,
      publish: 600,
      unpublish: 700,
      delete: 800,
      advanced: 870,
      refreshTree: 900
    }
  },

  dataObjectTreeAdvanced: {
    name: 'data-object.tree.advanced',
    priority: {
      lock: 100,
      lockAndPropagate: 110,
      unlock: 120,
      unlockAndPropagate: 130
    }
  },

  dataObjectListGrid: {
    name: 'data-object.list-grid',
    priority: {
      open: 100,
      rename: 200,
      locateInTree: 300,
      publish: 400,
      unpublish: 500,
      delete: 600
    }
  },

  assetListGrid: {
    name: 'asset.list-grid',
    priority: {
      open: 100,
      rename: 200,
      locateInTree: 300,
      delete: 400,
      download: 500
    }
  },

  assetPreviewCard: {
    name: 'asset.preview-card',
    priority: {
      open: 100,
      info: 200,
      rename: 300,
      locateInTree: 400,
      uploadNewVersion: 500,
      download: 600,
      delete: 700
    }
  }
}
