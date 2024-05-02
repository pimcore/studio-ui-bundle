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

const config: ConfigFile = {
  schemaFile: '../assets/api/docs.jsonopenapi.json',
  apiFile: '../src/app/api/pimcore/index.ts',
  apiImport: 'api',
  outputFiles: {
    '../src/modules/asset/asset-api-slice.gen.ts': {
      filterEndpoints: [/asset/i]
    },
    '../src/modules/app/translations/translations-api-slice.gen.ts': {
      filterEndpoints: [/translation/i]
    }
  },
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config
