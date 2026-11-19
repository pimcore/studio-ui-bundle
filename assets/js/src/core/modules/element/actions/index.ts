/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export enum ContextMenuActionName {
  rename = 'rename',
  unpublish = 'unpublish',
  delete = 'delete',
  refresh = 'refresh',
  publish = 'publish',
  open = 'open',
  lock = 'lock',
  lockAndPropagate = 'lockAndPropagate',
  unlock = 'unlock',
  unlockAndPropagate = 'unlockAndPropagate',
  locateInTree = 'locateInTree',
  copy = 'copy',
  cut = 'cut',
  paste = 'paste',
  pasteCut = 'pasteCut',
  addFolder = 'addFolder',

  addObject = 'addObject',
  addVariant = 'addVariant',
  pasteAsChildRecursive = 'pasteAsChildRecursive',
  pasteRecursiveUpdatingReferences = 'pasteRecursiveUpdatingReferences',
  pasteAsChild = 'pasteAsChild',
  pasteOnlyContents = 'pasteOnlyContents',

  sorting = 'sorting',
  sortingAscending = 'sortingAscending',
  sortingDescending = 'sortingDescending',
  sortingIndexed = 'sortingIndexed',

  openInNewWindow = 'openInNewWindow',
  openPreviewInNewWindow = 'openPreviewInNewWindow',

  addPage = 'addPage',
  addSnippet = 'addSnippet',
  addNewsletter = 'addNewsletter',
  addEmail = 'addEmail',
  addLink = 'addLink',
  addHardlink = 'addHardlink',

  downloadAsZip = 'downloadAsZip',
  uploadNewVersion = 'uploadNewVersion',
  upload = 'upload',
  uploadZip = 'uploadZip',
  download = 'download',
  clearImageThumbnails = 'clearImageThumbnails',
  clearVideoThumbnails = 'clearVideoThumbnails',
  clearPdfThumbnails = 'clearPdfThumbnails',

  shareViaNotification = 'shareViaNotification',
}

/**
 * Actions that operate on a whole selection.
 *
 * While more than one element is selected, everything else is hidden from the tree
 * context menu instead of quietly acting on the node that happened to be right
 * clicked. Extend this list when an action learns to handle a set.
 */
export const multiSelectionContextMenuActions: string[] = [
  ContextMenuActionName.delete,
  ContextMenuActionName.cut
]
