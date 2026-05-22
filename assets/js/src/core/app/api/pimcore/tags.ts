/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export type Tag = string | {
  type: string
  id: number | string
  elementType?: ElementType
}

export const tagNames = {
  ELEMENT: 'ELEMENT',
  ASSET: 'ASSET',
  ASSET_DETAIL: 'ASSET_DETAIL',
  ASSET_TREE: 'ASSET_TREE',
  ASSET_GRID_CONFIGURATION: 'ASSET_GRID_CONFIGURATION',
  ASSET_GRID: 'ASSET_GRID',
  ASSET_GRID_CONFIGURATION_LIST: 'ASSET_GRID_CONFIGURATION_LIST',
  ASSET_GRID_CONFIGURATION_DETAIL: 'ASSET_GRID_CONFIGURATION_DETAIL',
  DATA_OBJECT: 'DATA_OBJECT',
  DATA_OBJECT_DETAIL: 'DATA_OBJECT_DETAIL',
  DATA_OBJECT_TREE: 'DATA_OBJECT_TREE',
  DATA_OBJECT_GRID: 'DATA_OBJECT_GRID',
  DOCUMENT: 'DOCUMENT',
  DOCUMENT_DETAIL: 'DOCUMENT_DETAIL',
  DOCUMENT_TREE: 'DOCUMENT_TREE',
  DOCUMENT_TYPES: 'DOCUMENT_TYPES',
  DOCUMENT_SITE: 'DOCUMENT_SITE',
  VERSIONS: 'VERSION',
  PROPERTIES: 'PROPERTIES',
  SCHEDULES: 'SCHEDULES',
  DEPENDENCIES: 'DEPENDENCIES',
  NOTES_AND_EVENTS: 'NOTES_AND_EVENTS',
  NOTIFICATIONS: 'NOTIFICATIONS',
  NOTIFICATION_DETAILS: 'NOTIFICATION_DETAILS',
  AVAILABLE_TAGS: 'AVAILABLE_TAGS',
  SETTINGS_ADMIN: 'SETTINGS_ADMIN',
  WEBSITE_SETTINGS: 'WEBSITE_SETTINGS',
  REDIRECTS: 'REDIRECTS',
  ROBOTS_TXT: 'ROBOTS_TXT',
  ELEMENT_TAGS: 'TAGS',
  ROLE: 'ROLE',
  DOMAIN_TRANSLATIONS: 'DOMAIN_TRANSLATIONS',
  LOCALES: 'LOCALES',
  PREDEFINED_ASSET_METADATA: 'PREDEFINED_ASSET_METADATA',
  CURRENT_USER_INFORMATION: 'CURRENT_USER_INFORMATION',
  EMAIL_BLOCKLIST: 'EMAIL_BLOCKLIST',
  EMAIL_BLOCKLIST_DETAIL: 'EMAIL_BLOCKLIST_DETAIL',
  APPLICATION_LOGGER: 'APPLICATION_LOGGER',
  APPLICATION_LOGGER_DETAIL: 'APPLICATION_LOGGER_DETAIL',
  EMAIL_LOG: 'EMAIL_LOG',
  EMAIL_LOG_DETAIL: 'EMAIL_LOG_DETAIL',
  RECYCLE_BIN: 'RECYCLE_BIN',
  RECYCLE_BIN_DETAIL: 'RECYCLE_BIN_DETAIL',
  PERSPECTIVES: 'PERSPECTIVES',
  PERSPECTIVE_DETAIL: 'PERSPECTIVE_DETAIL',
  WIDGETS: 'WIDGETS',
  WIDGET_DETAIL: 'WIDGET_DETAIL',
  USERS: 'USERS',
  USER_DETAIL: 'USER_DETAIL',
  USER_TREE: 'USER_TREE',
  GDPR_DATA: 'GDPR_DATA',
  GDPR_DATA_DETAIL: 'GDPR_DATA_DETAIL',
  CLASS_DEFINITION: 'CLASS_DEFINITION',
  CLASS_DEFINITION_DETAIL: 'CLASS_DEFINITION_DETAIL',
  CLASS_DEFINITION_COLLECTION: 'CLASS_DEFINITION_COLLECTION',
  CUSTOM_LAYOUT: 'CUSTOM_LAYOUT',
  CUSTOM_LAYOUT_DETAIL: 'CUSTOM_LAYOUT_DETAIL',
  CUSTOM_LAYOUT_COLLECTION: 'CUSTOM_LAYOUT_COLLECTION',
  FIELD_COLLECTION: 'FIELD_COLLECTION',
  FIELD_COLLECTION_DETAIL: 'FIELD_COLLECTION_DETAIL',
  FIELD_COLLECTION_COLLECTION: 'FIELD_COLLECTION_COLLECTION',
  OBJECT_BRICK: 'OBJECT_BRICK',
  OBJECT_BRICK_DETAIL: 'OBJECT_BRICK_DETAIL',
  OBJECT_BRICK_COLLECTION: 'OBJECT_BRICK_COLLECTION',
  OBJECT_BRICK_CUSTOM_LAYOUT: 'OBJECT_BRICK_CUSTOM_LAYOUT',
  OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL: 'OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL',
  OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION: 'OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION',
  SELECT_OPTION_DETAIL: 'SELECT_OPTION_DETAIL',
  SELECT_OPTION_COLLECTION: 'SELECT_OPTION_COLLECTION',
  QUANTITY_VALUE_UNITS: 'QUANTITY_VALUE_UNITS'
}

export const providingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET, tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_DETAIL, id }],
  ASSET_TREE: () => [tagNames.ASSET, tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_TREE, id }],
  ASSET_GRID_CONFIGURATION: () => [tagNames.ASSET_GRID_CONFIGURATION],
  ASSET_GRID_CONFIGURATION_LIST: () => [
    tagNames.ASSET,
    tagNames.ASSET_GRID_CONFIGURATION,
    { type: tagNames.ASSET_GRID_CONFIGURATION_LIST }
  ],
  ASSET_GRID_CONFIGURATION_DETAIL: (configurationId?: number) => [
    tagNames.ASSET,
    { type: tagNames.ASSET_DETAIL },
    tagNames.ASSET_GRID_CONFIGURATION,
    { type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: configurationId }
  ],
  ASSET_GRID_ID: (id: number) => [tagNames.ASSET, { type: tagNames.ASSET_GRID, id }],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [tagNames.DATA_OBJECT, { type: tagNames.DATA_OBJECT_DETAIL, id }],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT, tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [tagNames.DATA_OBJECT, { type: tagNames.DATA_OBJECT_TREE, id }],
  DATA_OBJECT_GRID_ID: (id: number) => [tagNames.DATA_OBJECT, { type: tagNames.DATA_OBJECT_GRID, id }],
  DOCUMENT_DETAIL: () => [tagNames.DOCUMENT, tagNames.DOCUMENT_DETAIL],
  DOCUMENT_DETAIL_ID: (id: number) => [tagNames.DOCUMENT, { type: tagNames.DOCUMENT_DETAIL, id }],
  DOCUMENT_TYPES: () => [tagNames.DOCUMENT_TYPES],
  DOCUMENT_SITE: () => [tagNames.DOCUMENT, tagNames.DOCUMENT_SITE],
  DOMAIN_TRANSLATIONS: () => [tagNames.DOMAIN_TRANSLATIONS],
  LOCALES: () => [tagNames.LOCALES],
  DOCUMENT_TREE: () => [tagNames.DOCUMENT, tagNames.DOCUMENT_TREE],
  DOCUMENT_TREE_ID: (id: number) => [tagNames.DOCUMENT, { type: tagNames.DOCUMENT_TREE, id }],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.DEPENDENCIES, elementType, id)],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id)],
  PROPERTY_DETAIL: (id: string) => [{ type: tagNames.PROPERTIES, id }],
  GLOBAL_PROPERTIES: () => [tagNames.PROPERTIES],
  SETTINGS_ADMIN: () => [tagNames.SETTINGS_ADMIN],
  WEBSITE_SETTINGS: () => [tagNames.WEBSITE_SETTINGS],
  REDIRECTS: () => [tagNames.REDIRECTS],
  ROBOTS_TXT: () => [tagNames.ROBOTS_TXT],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.PROPERTIES, elementType, id)],
  SCHEDULE_DETAIL: (id: number) => [{ type: tagNames.SCHEDULES, id }, tagNames.SCHEDULES],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.SCHEDULES, elementType, id)],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ELEMENT_VERSIONS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.VERSIONS, elementType, id)],
  NOTES_AND_EVENTS: () => [tagNames.NOTES_AND_EVENTS],
  NOTES_AND_EVENTS_DETAIL: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.NOTES_AND_EVENTS, elementType, id)],
  NOTIFICATIONS: () => [tagNames.NOTIFICATIONS],
  NOTIFICATION_DETAIL: (id: number) => [{ type: tagNames.NOTIFICATION_DETAILS, id }],
  AVAILABLE_TAGS: () => [tagNames.AVAILABLE_TAGS],
  ELEMENT_TAGS: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementSpecificTag(tagNames.ELEMENT_TAGS, elementType, id)],
  ROLE: () => [tagNames.ROLE],
  PREDEFINED_ASSET_METADATA: () => [tagNames.PREDEFINED_ASSET_METADATA],
  CURRENT_USER_INFORMATION: () => [tagNames.CURRENT_USER_INFORMATION],
  EMAIL_BLOCKLIST: () => [tagNames.EMAIL_BLOCKLIST],
  EMAIL_BLOCKLIST_DETAIL: (id: string) => [{ type: tagNames.EMAIL_BLOCKLIST_DETAIL, id }],
  EMAIL_LOG: () => [tagNames.EMAIL_LOG],
  EMAIL_LOG_DETAIL: (id: number) => [{ type: tagNames.EMAIL_LOG_DETAIL, id }],
  RECYCLING_BIN: () => [tagNames.RECYCLE_BIN],
  RECYCLING_BIN_DETAIL: (id: number) => [{ type: tagNames.RECYCLE_BIN_DETAIL, id }],
  APPLICATION_LOGGER: () => [tagNames.APPLICATION_LOGGER],
  APPLICATION_LOGGER_DETAIL: (id: number) => [{ type: tagNames.APPLICATION_LOGGER_DETAIL, id }],
  PERSPECTIVES: () => [tagNames.PERSPECTIVES],
  PERSPECTIVE_DETAIL: (id: string) => [{ type: tagNames.PERSPECTIVE_DETAIL, id }],
  WIDGETS: () => [tagNames.WIDGETS],
  WIDGET_DETAIL: (id: string, widgetType: string) => [{ type: tagNames.WIDGET_DETAIL, id, widgetType }],
  USERS: () => [tagNames.USERS],
  USER_DETAIL: (id: number) => [{ type: tagNames.USER_DETAIL, id }],
  USER_TREE: () => [tagNames.USER_TREE],
  GDPR_DATA: (providerKey: string) => [{ type: tagNames.GDPR_DATA, id: providerKey }],
  GDPR_DATA_DETAIL: (providerKey: string, id: number) => [{ type: tagNames.GDPR_DATA_DETAIL, id: `${providerKey}-${id}` }],
  CLASS_DEFINITION: () => [tagNames.CLASS_DEFINITION],
  CLASS_DEFINITION_COLLECTION: () => [tagNames.CLASS_DEFINITION, tagNames.CLASS_DEFINITION_COLLECTION],
  CLASS_DEFINITION_DETAIL: (id: string) => [tagNames.CLASS_DEFINITION, { type: tagNames.CLASS_DEFINITION_DETAIL, id }],
  CUSTOM_LAYOUT: () => [tagNames.CUSTOM_LAYOUT],
  CUSTOM_LAYOUT_COLLECTION: () => [tagNames.CUSTOM_LAYOUT, tagNames.CUSTOM_LAYOUT_COLLECTION],
  CUSTOM_LAYOUT_DETAIL: (id: string) => [tagNames.CUSTOM_LAYOUT, { type: tagNames.CUSTOM_LAYOUT_DETAIL, id }],
  FIELD_COLLECTION: () => [tagNames.FIELD_COLLECTION],
  FIELD_COLLECTION_COLLECTION: () => [tagNames.FIELD_COLLECTION, tagNames.FIELD_COLLECTION_COLLECTION],
  FIELD_COLLECTION_DETAIL: (key: string) => [tagNames.FIELD_COLLECTION, { type: tagNames.FIELD_COLLECTION_DETAIL, id: key }],
  OBJECT_BRICK: () => [tagNames.OBJECT_BRICK],
  OBJECT_BRICK_COLLECTION: () => [tagNames.OBJECT_BRICK, tagNames.OBJECT_BRICK_COLLECTION],
  OBJECT_BRICK_DETAIL: (key: string) => [tagNames.OBJECT_BRICK, { type: tagNames.OBJECT_BRICK_DETAIL, id: key }],
  OBJECT_BRICK_CUSTOM_LAYOUT: () => [tagNames.OBJECT_BRICK_CUSTOM_LAYOUT],
  OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION: (key: string) => [tagNames.OBJECT_BRICK_CUSTOM_LAYOUT, { type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION, id: key }],
  OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL: (key: string, id: string) => [tagNames.OBJECT_BRICK_CUSTOM_LAYOUT, { type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL, id: `${key}-${id}` }],
  SELECT_OPTION_COLLECTION: () => [tagNames.SELECT_OPTION_COLLECTION],
  SELECT_OPTION_DETAIL: (id: string) => [{ type: tagNames.SELECT_OPTION_DETAIL, id }],
  QUANTITY_VALUE_UNITS: () => [tagNames.QUANTITY_VALUE_UNITS]
}

export const invalidatingTags = {
  ELEMENT: () => [tagNames.ELEMENT],
  ASSET: () => [tagNames.ASSET],
  ASSET_DETAIL: () => [tagNames.ASSET_DETAIL],
  ASSET_DETAIL_ID: (id: number) => [{ type: tagNames.ASSET_DETAIL, id }, elementUnspecificDataTag],
  ASSET_TREE: () => [tagNames.ASSET_TREE],
  ASSET_TREE_ID: (id: number) => [{ type: tagNames.ASSET_TREE, id }],
  ASSET_GRID_CONFIGURATION: () => [tagNames.ASSET_GRID_CONFIGURATION],
  ASSET_GRID_CONFIGURATION_DETAIL: (configurationId?: number) => [{ type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: configurationId }, { type: tagNames.ASSET_GRID_CONFIGURATION_DETAIL, id: configurationId }],
  ASSET_GRID_CONFIGURATION_LIST: () => [{ type: tagNames.ASSET_GRID_CONFIGURATION_LIST }],
  ASSET_GRID_ID: (id: number) => [{ type: tagNames.ASSET_GRID, id }],
  DATA_OBJECT: () => [tagNames.DATA_OBJECT],
  DATA_OBJECT_DETAIL: () => [tagNames.DATA_OBJECT_DETAIL],
  DATA_OBJECT_DETAIL_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_DETAIL, id }, elementUnspecificDataTag],
  DATA_OBJECT_TREE: () => [tagNames.DATA_OBJECT_TREE],
  DATA_OBJECT_TREE_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_TREE, id }],
  DATA_OBJECT_GRID_ID: (id: number) => [{ type: tagNames.DATA_OBJECT_GRID, id }],
  DOCUMENT: () => [tagNames.DOCUMENT],
  DOCUMENT_DETAIL: () => [tagNames.DOCUMENT_DETAIL],
  DOCUMENT_DETAIL_ID: (id: number) => [{ type: tagNames.DOCUMENT_DETAIL, id }, elementUnspecificDataTag],
  DOCUMENT_TYPES: () => [tagNames.DOCUMENT_TYPES],
  DOCUMENT_SITE: () => [tagNames.DOCUMENT_SITE],
  DOMAIN_TRANSLATIONS: () => [tagNames.DOMAIN_TRANSLATIONS],
  LOCALES: () => [tagNames.LOCALES],
  DOCUMENT_TREE: () => [tagNames.DOCUMENT_TREE],
  DOCUMENT_TREE_ID: (id: number) => [{ type: tagNames.DOCUMENT_TREE, id }],
  ELEMENT_DEPENDENCIES: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.DEPENDENCIES, elementType, id)],
  ELEMENT_WORKFLOW: (elementType: ElementType, id: number) => [], // No invalidation on workflow actions as we reload the editor anyways
  PROPERTY_DETAIL: (id: string) => [{ type: tagNames.PROPERTIES, id }],
  ELEMENT_PROPERTIES: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.PROPERTIES, elementType, id)],
  GLOBAL_PROPERTIES: () => [tagNames.PROPERTIES],
  SETTINGS_ADMIN: () => [tagNames.SETTINGS_ADMIN],
  WEBSITE_SETTINGS: () => [tagNames.WEBSITE_SETTINGS],
  REDIRECTS: () => [tagNames.REDIRECTS],
  ROBOTS_TXT: () => [tagNames.ROBOTS_TXT],
  SCHEDULE_DETAIL: (id: number) => [{ type: tagNames.SCHEDULES, id }],
  ELEMENT_SCHEDULES: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.SCHEDULES, elementType, id)],
  VERSIONS_DETAIL: (id: number) => [{ type: tagNames.VERSIONS, id }],
  ELEMENT_VERSIONS: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.VERSIONS, elementType, id)],
  NOTES_AND_EVENTS: () => [tagNames.NOTES_AND_EVENTS],
  NOTES_AND_EVENTS_DETAIL: (id: number) => [{ type: tagNames.NOTES_AND_EVENTS, id }],
  NOTIFICATION_DETAIL: (id: number) => [{ type: tagNames.NOTIFICATION_DETAILS, id }],
  NOTIFICATIONS: () => [tagNames.NOTIFICATIONS],
  ELEMENT_NOTES_AND_EVENTS: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.NOTES_AND_EVENTS, elementType, id)],
  AVAILABLE_TAGS: () => [tagNames.AVAILABLE_TAGS],
  ELEMENT_TAGS: (elementType: ElementType, id: number) => [getElementSpecificTag(tagNames.ELEMENT_TAGS, elementType, id)],
  ROLE: () => [tagNames.ROLE],
  PREDEFINED_ASSET_METADATA: () => [tagNames.PREDEFINED_ASSET_METADATA],
  ELEMENT_DETAIL: (elementType: ElementType, id: number) => [getElementDetailTag(elementType, id), getElementGridTag(elementType)],
  EMAIL_BLOCKLIST: () => [tagNames.EMAIL_BLOCKLIST],
  EMAIL_BLOCKLIST_DETAIL: (id: string) => [{ type: tagNames.EMAIL_BLOCKLIST_DETAIL, id }],
  APPLICATION_LOGGER: () => [tagNames.APPLICATION_LOGGER],
  APPLICATION_LOGGER_DETAIL: (id: number) => [{ type: tagNames.APPLICATION_LOGGER_DETAIL, id }],
  EMAIL_LOG: () => [tagNames.EMAIL_LOG],
  EMAIL_LOG_DETAIL: (id: number) => [{ type: tagNames.EMAIL_LOG_DETAIL, id }],
  RECYCLING_BIN: () => [tagNames.RECYCLE_BIN],
  PERSPECTIVES: () => [tagNames.PERSPECTIVES],
  WIDGETS: () => [tagNames.WIDGETS],
  USERS: () => [tagNames.USERS],
  USER_DETAIL: (id: number) => [{ type: tagNames.USER_DETAIL, id }],
  USER_TREE: () => [tagNames.USER_TREE],
  GDPR_DATA: (providerKey: string) => [{ type: tagNames.GDPR_DATA, id: providerKey }],
  GDPR_DATA_DETAIL: (providerKey: string, id: number) => [{ type: tagNames.GDPR_DATA_DETAIL, id: `${providerKey}-${id}` }],
  CLASS_DEFINITION: () => [tagNames.CLASS_DEFINITION],
  CLASS_DEFINITION_COLLECTION: () => [tagNames.CLASS_DEFINITION_COLLECTION],
  CLASS_DEFINITION_DETAIL: (id: string) => [{ type: tagNames.CLASS_DEFINITION_DETAIL, id }],
  CUSTOM_LAYOUT: () => [tagNames.CUSTOM_LAYOUT],
  CUSTOM_LAYOUT_COLLECTION: () => [tagNames.CUSTOM_LAYOUT_COLLECTION],
  CUSTOM_LAYOUT_DETAIL: (id: string) => [{ type: tagNames.CUSTOM_LAYOUT_DETAIL, id }],
  FIELD_COLLECTION: () => [tagNames.FIELD_COLLECTION],
  FIELD_COLLECTION_COLLECTION: () => [tagNames.FIELD_COLLECTION_COLLECTION],
  FIELD_COLLECTION_DETAIL: (key: string) => [{ type: tagNames.FIELD_COLLECTION_DETAIL, id: key }],
  OBJECT_BRICK: () => [tagNames.OBJECT_BRICK],
  OBJECT_BRICK_COLLECTION: () => [tagNames.OBJECT_BRICK_COLLECTION],
  OBJECT_BRICK_DETAIL: (key: string) => [{ type: tagNames.OBJECT_BRICK_DETAIL, id: key }],
  OBJECT_BRICK_CUSTOM_LAYOUT: () => [tagNames.OBJECT_BRICK_CUSTOM_LAYOUT],
  OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION: (key: string) => [{ type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_COLLECTION, id: key }],
  OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL: (key: string, id: string) => [{ type: tagNames.OBJECT_BRICK_CUSTOM_LAYOUT_DETAIL, id: `${key}-${id}` }],
  SELECT_OPTION_COLLECTION: () => [tagNames.SELECT_OPTION_COLLECTION],
  SELECT_OPTION_DETAIL: (id: string) => [{ type: tagNames.SELECT_OPTION_DETAIL, id }]
}

const elementUnspecificDataTag = tagNames.AVAILABLE_TAGS

const getElementSpecificTag = (tagType: string, elementType: ElementType, id: number): Tag => ({ type: tagType, id, elementType })

const getElementDetailTag = (elementType: ElementType, id: number): Tag => {
  switch (elementType) {
    case 'asset':
      return { type: tagNames.ASSET_DETAIL, id }
    case 'data-object':
      return { type: tagNames.DATA_OBJECT_DETAIL, id }
    case 'document':
      return { type: tagNames.DOCUMENT_DETAIL, id }
  }
}

const getElementGridTag = (elementType: ElementType): Tag => {
  switch (elementType) {
    case 'asset':
      return tagNames.ASSET_GRID
    case 'data-object':
      return tagNames.DATA_OBJECT_GRID
    case 'document':
      return tagNames.DOCUMENT
  }
}
