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
}
