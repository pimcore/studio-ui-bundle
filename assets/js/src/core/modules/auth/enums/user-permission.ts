/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export enum UserPermission {
  NotesAndEvents = 'notes_events',
  Documents = 'documents',
  DocumentTypes = 'document_types',
  Objects = 'objects',
  Assets = 'assets',
  TagsConfiguration = 'tags_configuration',
  PredefinedProperties = 'predefined_properties',
  Users = 'users',
  Notifications = 'notifications',
  SendNotifications = 'notifications_send',
  Emails = 'emails',
  ApplicationLogger = 'application_logging'
}
