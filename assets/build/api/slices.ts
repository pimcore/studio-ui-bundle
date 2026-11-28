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

/**
 * The single source of truth for the API slices: codegen (openapi-config.ts)
 * and the sync tool (sync/api-sync.ts) both derive from this list. Each slice
 * maps 1:1 to its schema snapshot (schema/<name>.json) and its generated
 * client (<outputFile>).
 */
export interface ApiSlice {
  name: string
  outputFile: string
  pattern: RegExp
}

export const SCHEMA_DIR = './schema'

export const schemaFileFor = (slice: Pick<ApiSlice, 'name'>): string => `${SCHEMA_DIR}/${slice.name}.json`

export const apiSlices: ApiSlice[] = [
  {
    name: 'asset',
    outputFile: '../../js/src/core/modules/asset/asset-api-slice.gen.ts',
    pattern: /api\/assets?/i
  },
  {
    name: 'data-object',
    outputFile: '../../js/src/core/modules/data-object/data-object-api-slice.gen.ts',
    pattern: /api\/data-object?/i
  },
  {
    name: 'document',
    outputFile: '../../js/src/core/modules/document/document-api-slice.gen.ts',
    pattern: /api\/document?/i
  },
  {
    name: 'website-settings',
    outputFile: '../../js/src/core/modules/website-settings/website-settings-api-slice.gen.ts',
    pattern: /api\/website-settings?/i
  },
  {
    name: 'translations',
    outputFile: '../../js/src/core/modules/app/translations/translations-api-slice.gen.ts',
    pattern: /api\/translation/i
  },
  {
    name: 'properties',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/properties/properties-api-slice.gen.ts',
    pattern: /api\/propert(y|ies)/i
  },
  {
    name: 'workflow',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen.ts',
    pattern: /api\/workflow/i
  },
  {
    name: 'user',
    outputFile: '../../js/src/core/modules/auth/user/user-api-slice.gen.ts',
    pattern: /api\/user/i
  },
  {
    name: 'roles',
    outputFile: '../../js/src/core/modules/user/roles/roles-api-slice.gen.ts',
    pattern: /api\/role/i
  },
  {
    name: 'service-users',
    outputFile: '../../js/src/core/modules/user/service-users/service-users-api-slice.gen.ts',
    pattern: /api\/service-users?(\/|$)/i
  },
  {
    name: 'version',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/versions/version-api-slice.gen.ts',
    pattern: /api\/version/i
  },
  {
    name: 'schedule',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/schedule/schedule-api-slice.gen.ts',
    pattern: /api\/schedule/i
  },
  {
    name: 'element',
    outputFile: '../../js/src/core/modules/element/element-api-slice.gen.ts',
    pattern: /api\/elements/i
  },
  {
    name: 'dependencies',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen.ts',
    pattern: /api\/dependencies/i
  },
  {
    name: 'tags',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts',
    pattern: /api\/tag/i
  },
  {
    name: 'notes-and-events',
    outputFile: '../../js/src/core/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen.ts',
    pattern: /api\/note/i
  },
  {
    name: 'metadata',
    outputFile: '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/custom-metadata/metadata-api-slice.gen.ts',
    pattern: /api\/metadata|api\/assets\/\{id\}\/custom-metadata/i
  },
  {
    name: 'settings',
    outputFile: '../../js/src/core/modules/app/settings/settings-slice.gen.ts',
    pattern: /api\/settings?/i
  },
  {
    name: 'mercure',
    outputFile: '../../js/src/core/modules/app/mercure-api-slice.gen.ts',
    pattern: /api\/mercure/i
  },
  {
    name: 'asset-thumbnails',
    outputFile: '../../js/src/core/modules/asset/editor/types/asset-thumbnails-api-slice.gen.ts',
    pattern: /api\/thumbnails/i
  },
  {
    name: 'authorization',
    outputFile: '../../js/src/core/modules/auth/authorization-api-slice.gen.ts',
    pattern: /\/api\/(login|logout|session)/i
  },
  {
    name: 'class-definition',
    outputFile: '../../js/src/core/modules/class-definition/class-definition-slice.gen.ts',
    pattern: /api\/class\//i
  },
  {
    name: 'unit',
    outputFile: '../../js/src/core/modules/data-object/unit-slice.gen.ts',
    pattern: /api\/unit\//i
  },
  {
    name: 'perspectives',
    outputFile: '../../js/src/core/modules/perspectives/perspectives-slice.gen.ts',
    pattern: /api\/perspectives\//i
  },
  {
    name: 'notifications',
    outputFile: '../../js/src/core/modules/notifications/notifications-slice.gen.ts',
    pattern: /api\/notifications\/?/i
  },
  {
    name: 'search',
    outputFile: '../../js/src/core/modules/search/search-api-slice.gen.ts',
    pattern: /api\/search\/?/i
  },
  {
    name: 'classification-store',
    outputFile: '../../js/src/core/modules/data-object/classification-store/classification-store-api-slice.gen.ts',
    pattern: /api\/classification-store\/?/i
  },
  {
    name: 'custom-reports',
    outputFile: '../../js/src/core/modules/reports/custom-reports-api-slice.gen.ts',
    pattern: /api\/bundle\/custom-reports\/?/i
  },
  {
    name: 'seo',
    outputFile: '../../js/src/core/modules/redirects/seo-api-slice.gen.ts',
    pattern: /api\/bundle\/seo\/?/i
  },
  {
    name: 'export',
    outputFile: '../../js/src/core/modules/element/export-api-slice.gen.ts',
    pattern: /\/api\/export\/?/i
  },
  {
    name: 'usage',
    outputFile: '../../js/src/core/modules/element/search-replace-assignments/usage-api-slice.gen.ts',
    pattern: /\/api\/elements\/usage\/?/i
  },
  {
    name: 'emails',
    outputFile: '../../js/src/core/modules/email/emails-api-slice.gen.ts',
    pattern: /\/api\/emails\/?/i
  },
  {
    name: 'recycle-bin',
    outputFile: '../../js/src/core/modules/recycle-bin/recycle-bin-api-slice.gen.ts',
    pattern: /\/api\/recycle-bin\/?/i
  },
  {
    name: 'ownership-management',
    outputFile: '../../js/src/core/modules/ownership-management/ownership-management-api-slice.gen.ts',
    pattern: /\/api\/ownership-management\/?/i
  },
  {
    name: 'execution-engine',
    outputFile: '../../js/src/core/modules/execution-engine/execution-engine-api-slice.gen.ts',
    pattern: /\/api\/execution-engine\/?/i
  },
  {
    name: 'gdpr-data-extractor',
    outputFile: '../../js/src/core/modules/gdpr-data-extractor/gdpr-data-extractor-api-slice.gen.ts',
    pattern: /\/api\/gdpr\/?/i
  },
  {
    name: 'cache',
    outputFile: '../../js/src/core/modules/cache/cache-api-slice.gen.ts',
    pattern: /\/api\/cache\/?/i
  },
  {
    name: 'index-sync',
    outputFile: '../../js/src/core/modules/index-sync/index-sync-api-slice.gen.ts',
    pattern: /\/api\/index-sync\/?/i
  },
  {
    name: 'application-logger',
    outputFile: '../../js/src/core/modules/application-logger/application-logger-api-slice.gen.ts',
    pattern: /api\/bundle\/application-logger/i
  },
  {
    name: 'telemetry',
    outputFile: '../../js/src/core/modules/telemetry/telemetry-api-slice.gen.ts',
    pattern: /\/api\/telemetry\/?/i
  },
  {
    name: 'oauth',
    outputFile: '../../js/src/core/modules/oauth/oauth-api-slice.gen.ts',
    pattern: /\/api\/oauth\//i
  },
  {
    name: 'mcp-servers',
    outputFile: '../../js/src/core/modules/mcp-servers/mcp-servers-api-slice.gen.ts',
    pattern: /\/api\/mcp\//i
  },
  {
    name: 'maintenance-mode',
    outputFile: '../../js/src/core/modules/maintenance-mode/maintenance-mode-api-slice.gen.ts',
    pattern: /\/api\/maintenance-mode/i
  }
]
