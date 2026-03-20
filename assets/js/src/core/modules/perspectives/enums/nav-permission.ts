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
  QuickAccessHidden = 'quickAccess.hidden',
  OpenDocument = 'quickAccess.open_document',
  OpenObject = 'quickAccess.open_object',
  OpenAsset = 'quickAccess.open_asset',
  RecycleBin = 'quickAccess.recycle_bin',

  DataManagementHidden = 'dataManagement.hidden',
  NotesAndEvents = 'dataManagement.notesEvents',
  SearchReplaceAssignments = 'dataManagement.searchReplaceAssignments',
  PredefinedProperties = 'dataManagement.predefinedProperties',
  TagConfiguration = 'dataManagement.tagConfiguration',
  GDPRDataExtractor = 'dataManagement.gdprDataExtractor',
  ClassDefinitions = 'dataManagement.dataModel_classes',
  FieldCollections = 'dataManagement.dataModel_fieldCollections',
  ObjectBricks = 'dataManagement.dataModel_objectBricks',
  ClassificationStore = 'dataManagement.dataModel_classificationStore',
  SelectOptions = 'dataManagement.dataModel_selectOptions',
  QuantityValues = 'dataManagement.dataModel_quantityValue',
  BulkExport = 'dataManagement.dataModel_bulkExport',
  BulkImport = 'dataManagement.dataModel_bulkImport',

  AssetThumbnails = 'assetManagement.assetThumbnails',
  PredefinedAssetMetadata = 'assetManagement.predefinedAssetMetadata',

  ExperienceEcommerceHidden = 'experienceEcommerce.hidden',
  Mails = 'experienceEcommerce.emails',
  DocumentTypes = 'experienceEcommerce.documentTypes',
  WebsiteSettings = 'experienceEcommerce.websiteSettings',
  Redirects = 'experienceEcommerce.redirects',

  TranslationsHidden = 'translations.hidden',
  Translations = 'translations.translations',
  Appearance = 'system.appearanceBranding',

  ReportingHidden = 'reporting.hidden',
  Reports = 'reporting.reports',
  CustomReportsConfiguration = 'reporting.customReportsConfiguration',

  SystemHidden = 'system.hidden',
  UsersHidden = 'system.users_hidden',
  Users = 'system.users_users',
  Roles = 'system.users_roles',
  PerspectiveEditor = 'system.perspectiveEditor',
  WidgetEditor = 'system.widgetEditor',
  ApplicationLogger = 'system.applicationLogger',
  About = 'system.about',
  SystemSettings = 'system.systemSettings',

  SearchHidden = 'search.hidden'
}
