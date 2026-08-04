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
  Translations = 'translations',
  Appearance = 'system_appearance_settings',
  Documents = 'documents',
  DocumentTypes = 'document_types',
  Objects = 'objects',
  Assets = 'assets',
  Thumbnails = 'thumbnails',
  TagsConfiguration = 'tags_configuration',
  TagsSearch = 'tags_search',
  PredefinedProperties = 'predefined_properties',
  WebsiteSettings = 'website_settings',
  Users = 'users',
  Notifications = 'notifications',
  SendNotifications = 'notifications_send',
  Emails = 'emails',
  Reports = 'reports',
  ReportsConfig = 'reports_config',
  RecycleBin = 'recyclebin',
  Redirects = 'redirects',
  RobotsTxt = 'robots.txt',
  ApplicationLogger = 'application_logging',
  PerspectiveEditor = 'studio_perspective_editor',
  WidgetEditor = 'studio_perspective_widget_editor',
  GDPRDataExtractor = 'gdpr_data_extractor',
  SystemSettings = 'system_settings',
  Classes = 'classes',
  FieldCollections = 'fieldcollections',
  ObjectBricks = 'objectbricks',
  ClassificationStore = 'classificationstore',
  SelectOptions = 'selectoptions',
  QuantityValues = 'quantityValueUnits',
  AssetMetadata = 'asset_metadata',
  ClearCache = 'clear_cache'
}
