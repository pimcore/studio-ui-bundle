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
    'archive': 'colorWarning',
    'audio': 'colorSuccess',
    'document': 'colorPrimary',
    'folder': 'colorWarning',
    'image': 'colorSuccess',
    'text': 'colorTextSecondary',
    'unknown': 'colorTextTertiary',
    'video': 'colorError',
    'email': 'colorInfo',
    'hardlink': 'colorLink',
    'link': 'colorLink',
    'newsletter': 'colorInfo',
    'snippet': 'colorPrimary',
    'page': 'colorPrimary',
    'object': 'colorWarning',
    'variant': 'colorTextSecondary'
  },
  'fieldDefinition': {
    'input': 'colorPrimary',
    'textarea': 'colorPrimary',
    'wysiwyg': 'colorPrimary',
    'password': 'colorError',
    'input-quantity-value': 'colorSuccess',
    'select': 'colorInfo',
    'multiselect': 'colorInfo',
    'language': 'colorLink',
    'languagemultiselect': 'colorLink',
    'country': 'colorLink',
    'countrymultiselect': 'colorLink',
    'user': 'colorWarning',
    'boolean-select': 'colorSuccess',
    'numeric': 'colorSuccess',
    'numeric-range': 'colorSuccess',
    'slider': 'colorSuccess',
    'quantity-value': 'colorSuccess',
    'quantity-value-range': 'colorSuccess',
    'consent': 'colorInfo',
    'firstname': 'colorPrimary',
    'lastname': 'colorPrimary',
    'email': 'colorInfo',
    'gender': 'colorTextSecondary',
    'rgba-color': 'colorWarning',
    'encrypted-field': 'colorError',
    'calculated-value': 'colorSuccess',
    'checkbox': 'colorSuccess',
    'link': 'colorLink',
    'url-slug': 'colorLink',
    'date': 'colorWarning',
    'datetime': 'colorWarning',
    'date-range': 'colorWarning',
    'time': 'colorWarning',
    'external-image': 'colorSuccess',
    'image': 'colorSuccess',
    'video': 'colorError',
    'hotspotimage': 'colorSuccess',
    'image-gallery': 'colorSuccess',
    'geopoint': 'colorInfo',
    'geobounds': 'colorInfo',
    'geopolygon': 'colorInfo',
    'geopolyline': 'colorInfo',
    'many-to-one-relation': 'colorLink',
    'many-to-many-relation': 'colorLink',
    'many-to-many-object-relation': 'colorLink',
    'advanced-many-to-many-object-relation': 'colorLink',
    'advanced-many-to-many-relation': 'colorLink',
    'reverse-object-relation': 'colorLink',
    'table': 'colorTextSecondary',
    'structured-table': 'colorTextSecondary',
    'block': 'colorWarning',
    'localizedfields': 'colorPrimary',
    'fieldcollections': 'colorWarning',
    'objectbricks': 'colorWarning',
    'classificationstore': 'colorInfo',
    'target-group': 'colorInfo',
    'target-group-multiselect': 'colorInfo',
    'permission-resource': 'colorError',
    'permission-many-to-one-relation': 'colorError',
    'permission-many-to-many-relation': 'colorError',
    'dynamic-permission-resource': 'colorError',
    'data-quality': 'colorSuccess',
    'panel': 'colorTextTertiary',
    'tabpanel': 'colorTextTertiary',
    'accordion': 'colorTextTertiary',
    'region': 'colorTextTertiary',
    'text': 'colorTextSecondary',
    'fieldset': 'colorTextTertiary',
    'fieldcontainer': 'colorTextTertiary',
    'iframe': 'colorInfo'
  }
}
