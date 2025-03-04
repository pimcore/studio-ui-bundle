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

export enum NavPermission {
  ToolsHidden = 'extras.hidden',
  NotesAndEvents = 'extras.notesEvents',

  FileHidden = 'file.hidden',
  OpenDocument = 'file.open_document',
  OpenObject = 'file.open_object',
  OpenAsset = 'file.open_asset',

  SettingsHidden = 'settings.hidden',
  TagConfiguration = 'settings.tagConfiguration',
  UsersHidden = 'settings.users_hidden',
  Users = 'settings.users_users',
  Roles = 'settings.users_roles',
}
