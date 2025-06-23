/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export enum NavPermission {
  ToolsHidden = 'extras.hidden',
  NotesAndEvents = 'extras.notesEvents',
  Mails = 'extras.emails',

  FileHidden = 'file.hidden',
  OpenDocument = 'file.open_document',
  OpenObject = 'file.open_object',
  OpenAsset = 'file.open_asset',

  SettingsHidden = 'settings.hidden',
  TagConfiguration = 'settings.tagConfiguration',
  WebsiteSettings = 'settings.websiteSettings',
  PredefinedProperties = 'settings.predefinedProperties',
  UsersHidden = 'settings.users_hidden',
  Users = 'settings.users_users',
  Roles = 'settings.users_roles',
}
