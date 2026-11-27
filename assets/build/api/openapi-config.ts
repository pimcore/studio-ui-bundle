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
import { apiSlices, schemaFileFor } from './slices'

const pathMatcher = (pattern: RegExp) => {
  return (name: string, definition: { path: string }): boolean => {
    return pattern.test(definition.path);
  }
}

const config: ConfigFile = {
  // Required by the ConfigFile type, but never read: every output file below
  // carries its own per-slice schemaFile. Resync a slice's snapshot and client
  // from a backend export with `npm run api:sync -- --schema <file|url> <slice>`,
  // or regenerate the client from its committed snapshot with
  // `npm run api:check -- --fix <slice>`.
  schemaFile: './schema/__per-slice__.json',
  apiFile: '@sdk/api',
  apiImport: 'api',
  endpointOverrides: [
    {
      pattern: 'assetGetGrid',
      type: 'query',
    },
    // POST only because the file name list does not fit in a query string; it is a
    // read, so it must not invalidate the Assets cache on every batch.
    {
      pattern: 'assetUploadBatchInfo',
      type: 'query',
    },
    {
      pattern: 'dataObjectGetGrid',
      type: 'query',
    },
    {
      pattern: 'dataObjectFormatPath',
      type: 'query',
    },
    {
      pattern: 'dataObjectGetSelectOptions',
      type: 'query',
    },
    {
      pattern: 'noteGetCollection',
      type: 'query'
    },
    // POST only because the filter payload does not fit in a query string; it is a read.
    {
      pattern: 'bundleApplicationLoggerGetCollection',
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
      pattern: 'emailLogSearch',
      type: 'query'
    },
    {
      pattern: 'documentGetSearch',
      type: 'query',
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
      pattern: 'ownershipManagementGetCollection',
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
      pattern: 'customReportsColumnConfigList',
      type: 'query'
    },
    {
      pattern: 'translationGetList',
      type: 'query'
    },
    {
      pattern: 'documentPageSnippetAreaBlockRender',
      type: 'query'
    },
    {
      pattern: 'executionEngineListJobs',
      type: 'query'
    },
    {
      pattern: 'userTokenLinkGet',
      type: 'query'
    },
    {
      pattern: 'gdprSearchData',
      type: 'query'
    },
    {
      pattern: 'classificationStoreConfigurationCollectionCollection',
      type: 'query'
    },
    {
      pattern: 'classificationStoreConfigurationGroupCollection',
      type: 'query'
    },
    {
      pattern: 'classificationStoreConfigurationKeyCollection',
      type: 'query'
    },
    {
      pattern: 'classificationStoreConfigurationKeyGroupRelationCollection',
      type: 'query'
    },
    {
      pattern: 'classificationStoreConfigurationCollectionRelationCollection',
      type: 'query'
    },
    {
      pattern: 'classificationStoreConfigurationSubGroupCollection',
      type: 'query'
    },
    {
      pattern: 'unitQuantityValueUnitsCollection',
      type: 'query'
    }
  ],
  outputFiles: Object.fromEntries(apiSlices.map((slice) => [
    slice.outputFile,
    {
      schemaFile: schemaFileFor(slice),
      filterEndpoints: pathMatcher(slice.pattern)
    }
  ])),
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config
