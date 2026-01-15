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
  "element": {
    "image": "green4",
    "video": "magenta2",
    "xlsx-csv": "green3",
    "presentation": "red6",
    "txt-docs": "blue2",
    "unknown": "violet3",
    "audio": "gold1",
    "json": "violet1",
    "pdf": "red1",
    "zip": "gold3",
    "email": "beige3",
    "document": "purple4",
    "snippet": "violet1",
    "document-link": "orange3",
    "hardlink": "red3",
    "printpage": "mint2",
    "catalog": "magenta3",
    "data-object-variant": "blue1",
    "home-root-folder": "colorIconTree",
    "folder": "colorIconTree",
    "asset": "green1",
    "data-object": "purple4",
    "bookmark-list-document-folder": "green1",
    "bookmark-list-asset-folder": "purple4",
    "bookmark-list-object-folder": "mint3"
  },
  "fieldDefinition": {
     // Layout Components
    "accordion": "red5",
    "fieldset": "red5",
    "field-container": "red5",
    "panel": "red5",
    "region": "red5",
    "tab-panel": "red5",
    "preview": "red5",
    "text-field": "red5",

    // Text
    "text-input": "mint2",
    "content": "mint2",
    "wysiwyg-field": "mint2",
    "password": "mint2",
    "quantity-value": "mint2",

    // Number
    "number-type": "violet5",
    "input-quantity-value": "violet5",
    "number-range": "violet5",
    "slider": "violet5",
    "quantity-value-range": "violet5",

    // Date
    "date": "magenta4",
    "date-range": "magenta4",
    "date-time-field": "magenta4",
    "calendar": "magenta4",
    "time": "magenta4",

    // Select
    "select-type": "blue3",
    "boolean-select": "blue3",
    "countries-multiple": "blue3",
    "chevron-down": "blue3",
    "user": "blue3",
    "country-select": "blue3",
    "language-select": "blue3",
    "multi-select": "blue3",
    "language-overview": "blue3",

    // Media
    "media": "green4",
    "image-external": "green4",
    "image-advanced": "green4",
    "image-gallery": "green4",
    "image": "green4",
    "video": "green4",

    // Relation
    "relation": "orange1",
    "many-to-many-relation": "orange1",
    "many-to-one-relation": "orange1",
    "many-to-many-object-relation": "orange1",
    "advanced-many-to-many-relation": "orange1",
    "advanced-many-to-many-object-relation": "orange1",
    "reverse-object-relation": "orange1",

    // Geographic
    "location-marker": "green5",
    "geographical-bounds": "green5",
    "geographical-polygon": "green5",
    "geographical-polyline": "green5",

    // CRM
    "crm": "beige3",
    "gdpr-extractor": "beige3",
    "name": "beige3",
    "email": "beige3",
    "gender": "beige3",
    "target-group": "beige3",
    "target-groups-configuration": "beige3",
    "newsletter-active": "beige3",
    "newsletter-confirmed": "beige3",

    // Structured
    "batch-selection": "purple1",
    "block": "purple1",
    "table": "purple1",
    "structured-table": "purple1",
    "classification-store": "purple1",
    "field-collection-field": "purple1",
    "object-bricks": "purple1",
    "translations": "purple1",

    // E-commerce
    "cms": "orange2",
    "multiple-field": "orange2",
    "combobox-field": "orange2",
    "index-field": "orange2",

    // Permission Toolkit
    "shield": "blue4",
    "permission-resource": "blue4",
    "permission-object": "blue4",
    "permission-many-to-one": "blue4",
    "dynamic-permission": "blue4",

    // Other
    "other": "red3",
    "color": "red3",
    "encrypted": "red3",
    "url-slug": "red3",
    "checkbox": "red3",
    "hardlink": "red3",
    "data-quality": "red3"
  },

  // Exception subgroup
  "fieldDefinition_inputQuantityValue": {
    "quantity-value": "violet5"
  }
}
