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
  apiFile: '../../js/src/core/app/api/pimcore/index.ts',
  apiImport: 'api',
  outputFiles: {
    '../../js/src/core/modules/asset/asset-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/assets?/i)
    },
    '../../js/src/core/modules/app/translations/translations-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/translation/i)
    },
    '../../js/src/core/modules/asset/properties-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/properties/i)
    },
    '../../js/src/core/modules/element/editor/workflow-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/workflow/i)
    },
    '../../js/src/core/modules/auth/user/user-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/user/i)
    },
    '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/versions/versions-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/version/i)
    },
    '../../js/src/core/modules/element/editor/schedule-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/schedule/i)
    },
    '../../js/src/core/modules/element/element-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/path/i)
    },
    '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/dependencies/dependencies-api-slice.gen.ts': {
      filterEndpoints: pathMatcher(/dependencies/i)
    },
    '../../js/src/core/modules/asset/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen.ts': {
      filterEndpoints: [/tags/i]
    },
  },
  exportName: 'api',
  hooks: true,
  tag: true
}

export default config
