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
  pasteAsChildRecursive = 'pasteAsChildRecursive',
  pasteRecursiveUpdatingReferences = 'pasteRecursiveUpdatingReferences',
  pasteAsChild = 'pasteAsChild',
  pasteOnlyContents = 'pasteOnlyContents',

  addPage = 'addPage',

  downloadAsZip = 'downloadAsZip',
  uploadNewVersion = 'uploadNewVersion',
  upload = 'upload',
  uploadZip = 'uploadZip',
  download = 'download',
  clearImageThumbnails = 'clearImageThumbnails',
  clearVideoThumbnails = 'clearVideoThumbnails',
  clearPdfThumbnails = 'clearPdfThumbnails',
}
