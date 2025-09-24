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
  Add = 'add',
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
  HideAdd = 'hideAdd',
  AddUpload = 'addUpload',
  AddUploadZip = 'addUploadZip',
  Download = 'download',
  DownloadZip = 'downloadZip',
  UploadNewVersion = 'uploadNewVersion',

  // Data object specific
  ChangeChildrenSortBy = 'changeChildrenSortBy',

  // Document specific
  AddEmail = 'addEmail',
  AddHardlink = 'addHardlink',
  AddHeadlessDocument = 'addHeadlessDocument',
  AddLink = 'addLink',
  AddNewsletter = 'addNewsletter',
  AddPrintPage = 'addPrintPage',
  AddSnippet = 'addSnippet',
  Convert = 'convert',
  EditSite = 'editSite',
  Open = 'open',
  PasteCut = 'pasteCut',
  RemoveSite = 'removeSite',
  UseAsSite = 'useAsSite',
}
