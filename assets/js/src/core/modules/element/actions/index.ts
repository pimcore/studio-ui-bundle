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

  downloadAsZip = 'downloadAsZip',
  uploadNewVersion = 'uploadNewVersion',
  download = 'download',
  clearImageThumbnails = 'clearImageThumbnails',
  clearVideoThumbnails = 'clearVideoThumbnails',
  clearPdfThumbnails = 'clearPdfThumbnails',
}
