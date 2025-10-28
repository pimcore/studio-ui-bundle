/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export const GENERAL_FIELDS = ['save', 'publish', 'unpublish', 'rename', 'refresh']
export const NAVIGATION_FIELDS = ['openDocument', 'openAsset', 'openObject', 'openClassEditor', 'openInTree', 'closeAllTabs']
export const SEO_FIELDS = ['redirects', 'tagConfiguration', 'seoDocumentEditor', 'robots']
export const SYSTEM_FIELDS = ['showMetaInfo', 'showElementHistory', 'sharedTranslations', 'recycleBin', 'notesEvents', 'users', 'roles', 'clearAllCaches', 'clearDataCache', 'customReports', 'reports', 'applicationLogger', 'glossary', 'httpErrorLog']
export const SEARCH_FIELDS = ['searchDocument', 'searchAsset', 'searchObject', 'searchAndReplaceAssignments', 'quickSearch']

export const ALL_FIELDS = [...GENERAL_FIELDS, ...NAVIGATION_FIELDS, ...SEO_FIELDS, ...SYSTEM_FIELDS, ...SEARCH_FIELDS]
