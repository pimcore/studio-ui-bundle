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

import { type ConfigFile } from '@rtk-query/codegen-openapi'
import { EndpointMatcherFunction } from '@rtk-query/codegen-openapi/lib/types';

const pathMatcher = (pattern: RegExp): EndpointMatcherFunction => {
  return (name, definition) => {
    return pattern.test(definition.path);
  }
}

const config: ConfigFile = {
  schemaFile: './docs.jsonopenapi.json',
  apiFile: '@sdk/api',
  apiImport: 'api',
  endpointOverrides: [
    {
      pattern: 'assetGetGrid',
      type: 'query',
    },
    {
      pattern: 'dataObjectGetGrid',
      type: 'query',
    },
    {
      pattern: 'noteGetCollection',
      type: 'query'
    },
    {
      pattern: 'bundleSeoRedirectsGetCollection',
      type: 'query'
    },
    {
      pattern: 'websiteSettingsGetCollection',
      type: 'query'
    },
    {
      pattern: 'notificationGetCollection',
      type: 'query'
    },
    {
      pattern: 'assetGetSearch',
      type: 'query',
    },
    {
      pattern: 'dataObjectGetSearch',
      type: 'query',
    },
    {
      pattern: 'metadataGetCollection',
      type: 'query'
    },
    {
      pattern: 'recycleBinGetCollection',
      type: 'query'
    },
    {
      pattern: 'dataObjectGetGridPreview',
      type: 'query',
    },
    {
      pattern: 'customReportsChart',
      type: 'query'
    },
    {
      pattern: 'customReportsListDrillDownOptions',
      type: 'query'
    },
    {
      pattern: 'translationGetList',
      type: 'query'
    }
  ],
  outputFiles: {
    '../../js/src/core/modules/asset/asset-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/assets?/i)
    },
    '../../js/src/core/modules/data-object/data-object-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/data-object?/i)
    },
    '../../js/src/core/modules/document/document-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/document?/i)
    },
    '../../js/src/core/modules/website-settings/website-settings-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/website-settings?/i)
    },
    '../../js/src/core/modules/app/translations/translations-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/translation/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/propert(y|ies)/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/workflow/i)
    },
    '../../js/src/core/modules/auth/user/user-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/user/i)
    },
    '../../js/src/core/modules/user/roles/roles-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/role/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/version/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/schedule/i)
    },
    '../../js/src/core/modules/element/element-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/elements/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/dependencies/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/tag/i)
    },
    '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/note/i)
    },
    '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/metadata|api\/assets\/\{id\}\/custom-metadata/i)
    },
    '../../js/src/core/modules/app/settings/settings-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/settings/i)
    },
    '../../js/src/core/modules/app/mercure-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/mercure/i)
    },
    '../../js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/thumbnails/i)
    },
    '../../js/src/core/modules/auth/authorization-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/(login|logout)/i)
    },
    '../../js/src/core/modules/class-definition/class-definition-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/class\//i)
    },
    '../../js/src/core/modules/data-object/unit-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/unit\//i)
    },
    '../../js/src/core/modules/document/sites-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/documents\/sites\//i)
    },
    '../../js/src/core/modules/perspectives/perspectives-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/perspectives\//i)
    },
    '../../js/src/core/modules/notifications/notifications-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/notifications\/?/i)
    },
    '../../js/src/core/modules/search/search-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/search\/?/i)
    },
    '../../js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/classification-store\/?/i)
    },
    '../../js/src/core/modules/reports/custom-reports-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/bundle\/custom-reports\/?/i)
    },
    '../../js/src/core/modules/redirects/seo-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/api\/bundle\/seo\/?/i)
    },
    '../../js/src/core/modules/element/export-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/api\/export\/?/i)
    },
    '../../js/src/core/modules/email/emails-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/api\/emails\/?/i)
    },
    '../../js/src/core/modules/recycle-bin/recycle-bin-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/\/api\/recycle-bin\/?/i)
    }
  },
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config
