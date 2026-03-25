/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable quote-props */

export type ColorToken = string

export type IconColorGroups = Record<string, Record<string, ColorToken>>

export const defaultIconColorGroups: IconColorGroups = {
  'element': {
    'image': 'colorCodingGreen4',
    'video': 'colorCodingMagenta2',
    'xlsx-csv': 'colorCodingGreen3',
    'presentation': 'colorCodingRed6',
    'txt-docs': 'colorCodingBlue2',
    'unknown': 'colorCodingViolet3',
    'audio': 'colorCodingGold1',
    'json': 'colorCodingViolet1',
    'pdf': 'colorCodingRed1',
    'zip': 'colorCodingGold3',
    'email': 'colorCodingBeige3',
    'document': 'colorCodingPurple4',
    'snippet': 'colorCodingViolet1',
    'document-link': 'colorCodingOrange3',
    'hardlink': 'colorCodingRed3',
    'printpage': 'colorCodingMint2',
    'catalog': 'colorCodingMagenta3',
    'data-object-variant': 'colorCodingBlue1',
    'home-root-folder': 'colorIconTree',
    'folder': 'colorIconTree',
    'asset': 'colorCodingGreen1',
    'data-object': 'colorCodingMint3',
    'bookmark-list-document-folder': 'colorCodingGreen1',
    'bookmark-list-asset-folder': 'colorCodingPurple4',
    'bookmark-list-object-folder': 'colorCodingMint3'
  },
  'fieldDefinition': {
    // Layout Components
    'accordion': 'colorCodingRed5',
    'fieldset': 'colorCodingRed5',
    'field-container': 'colorCodingRed5',
    'panel': 'colorCodingRed5',
    'region': 'colorCodingRed5',
    'tab-panel': 'colorCodingRed5',
    'preview': 'colorCodingRed5',
    'text-field': 'colorCodingRed5',

    // Text
    'text-input': 'colorCodingMint2',
    'content': 'colorCodingMint2',
    'wysiwyg-field': 'colorCodingMint2',
    'password': 'colorCodingMint2',

    // Number
    'number-type': 'colorCodingViolet5',
    'input-quantity-value': 'colorCodingViolet5',
    'number-range': 'colorCodingViolet5',
    'slider': 'colorCodingViolet5',
    'quantity-value-range': 'colorCodingViolet5',
    'quantity-value': 'colorCodingViolet5',

    // Date
    'date': 'colorCodingMagenta4',
    'date-range': 'colorCodingMagenta4',
    'date-time-field': 'colorCodingMagenta4',
    'calendar': 'colorCodingMagenta4',
    'time': 'colorCodingMagenta4',

    // Select
    'select-type': 'colorCodingBlue3',
    'boolean-select': 'colorCodingBlue3',
    'countries-multiple': 'colorCodingBlue3',
    'chevron-down': 'colorCodingBlue3',
    'user': 'colorCodingBlue3',
    'country-select': 'colorCodingBlue3',
    'language-select': 'colorCodingBlue3',
    'multi-select': 'colorCodingBlue3',
    'language-overview': 'colorCodingBlue3',

    // Media
    'media': 'colorCodingGreen4',
    'image-external': 'colorCodingGreen4',
    'image-advanced': 'colorCodingGreen4',
    'image-gallery': 'colorCodingGreen4',
    'image': 'colorCodingGreen4',
    'video': 'colorCodingGreen4',

    // Relation
    'relation': 'colorCodingOrange1',
    'many-to-many-relation': 'colorCodingOrange1',
    'many-to-one-relation': 'colorCodingOrange1',
    'many-to-many-object-relation': 'colorCodingOrange1',
    'advanced-many-to-many-relation': 'colorCodingOrange1',
    'advanced-many-to-many-object-relation': 'colorCodingOrange1',
    'reverse-object-relation': 'colorCodingOrange1',

    // Geographic
    'location-marker': 'colorCodingGreen5',
    'geographical-bounds': 'colorCodingGreen5',
    'geographical-polygon': 'colorCodingGreen5',
    'geographical-polyline': 'colorCodingGreen5',

    // CRM
    'crm': 'colorCodingBeige3',
    'gdpr-extractor': 'colorCodingBeige3',
    'name': 'colorCodingBeige3',
    'email': 'colorCodingBeige3',
    'gender': 'colorCodingBeige3',
    'target-group': 'colorCodingBeige3',
    'target-groups-configuration': 'colorCodingBeige3',
    'newsletter-active': 'colorCodingBeige3',
    'newsletter-confirmed': 'colorCodingBeige3',

    // Structured
    'batch-selection': 'colorCodingPurple1',
    'block': 'colorCodingPurple1',
    'table': 'colorCodingPurple1',
    'structured-table': 'colorCodingPurple1',
    'classification-store': 'colorCodingPurple1',
    'field-collection-field': 'colorCodingPurple1',
    'object-bricks': 'colorCodingPurple1',
    'translations': 'colorCodingPurple1',

    // E-commerce
    'cms': 'colorCodingOrange2',
    'multiple-field': 'colorCodingOrange2',
    'combobox-field': 'colorCodingOrange2',
    'index-field': 'colorCodingOrange2',

    // Permission Toolkit
    'shield': 'colorCodingBlue4',
    'permission-resource': 'colorCodingBlue4',
    'permission-object': 'colorCodingBlue4',
    'permission-many-to-one': 'colorCodingBlue4',
    'dynamic-permission': 'colorCodingBlue4',

    // Other
    'other': 'colorCodingRed3',
    'color': 'colorCodingRed3',
    'encrypted': 'colorCodingRed3',
    'url-slug': 'colorCodingRed3',
    'checkbox': 'colorCodingRed3',
    'hardlink': 'colorCodingRed3',
    'data-quality': 'colorCodingRed3',
    'calculator': 'colorCodingRed3'
  },

  // Exception subgroup
  'fieldDefinition_inputQuantityValue': {
    'quantity-value': 'colorCodingMint2'
  }
}
