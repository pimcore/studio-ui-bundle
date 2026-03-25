/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export enum TreePermission {
  AddFolder = 'addFolder',
  Copy = 'copy',
  Cut = 'cut',
  Delete = 'delete',
  Lock = 'lock',
  LockAndPropagate = 'lockAndPropagate',
  Paste = 'paste',
  Publish = 'publish',
  Refresh = 'refresh',
  Rename = 'rename',
  SearchAndMove = 'searchAndMove',
  Unlock = 'unlock',
  UnlockAndPropagate = 'unlockAndPropagate',
  Unpublish = 'unpublish',

  // Asset specific
  AddUpload = 'addUpload',
  AddUploadZip = 'addUploadZip',
  Download = 'download',
  DownloadZip = 'downloadZip',
  UploadNewVersion = 'uploadNewVersion',

  // Data object specific
  AddObject = 'addObject',
  AddVariant = 'addVariant',
  ChangeChildrenSortBy = 'changeChildrenSortBy',

  // Document specific
  AddPage = 'addPage',
  AddSnippet = 'addSnippet',
  AddLink = 'addLink',
  AddEmail = 'addEmail',
  AddHardlink = 'addHardlink',
  Convert = 'convert',
  EditSite = 'editSite',
  Open = 'open',
  PasteCut = 'pasteCut',
  RemoveSite = 'removeSite',
  UseAsSite = 'useAsSite',
}
