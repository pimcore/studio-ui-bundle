import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'mf',
      dts: {
        bundle: true,
        distPath: './dist/sdk'
      },
      output: {
        
      }
    },
  ],
  source: {
    entry: {
      main: './js/src/sdk/main.ts',
      'components/index': './js/src/sdk/components/index.ts',
      'app/index': './js/src/sdk/app/index.ts',
      'api/asset/index': './js/src/sdk/api/asset/index.ts',
      'api/index': './js/src/sdk/api/index.ts',
      'api/custom-metadata/index': './js/src/sdk/api/custom-metadata/index.ts',
      'api/data-object/index': './js/src/sdk/api/data-object/index.ts',
      'api/dependencies/index': './js/src/sdk/api/dependencies/index.ts',
      'api/documents/index': './js/src/sdk/api/documents/index.ts',
      'api/elements/index': './js/src/sdk/api/elements/index.ts',
      'api/metadata/index': './js/src/sdk/api/metadata/index.ts',
      'api/perspectives/index': './js/src/sdk/api/perspectives/index.ts',
      'api/properties/index': './js/src/sdk/api/properties/index.ts',
      'api/role/index': './js/src/sdk/api/asset/index.ts',
      'api/schedule/index': './js/src/sdk/api/schedule/index.ts',
      'api/settings/index': './js/src/sdk/api/settings/index.ts',
      'api/tags/index': './js/src/sdk/api/tags/index.ts',
      'api/thumbnails/index': './js/src/sdk/api/thumbnails/index.ts',
      'api/translations/index': './js/src/sdk/api/translations/index.ts',
      'api/user/index': './js/src/sdk/api/user/index.ts',
      'api/version/index': './js/src/sdk/api/version/index.ts',
      'api/workflow/index': './js/src/sdk/api/workflow/index.ts',
      'modules/app/index': './js/src/sdk/modules/app/index.ts',
      'modules/asset/index': './js/src/sdk/modules/asset/index.ts',
      'modules/class-definitions/index': './js/src/sdk/modules/class-definitions/index.ts',
      'modules/data-object/index': './js/src/sdk/modules/data-object/index.ts',
      'modules/element/index': './js/src/sdk/modules/element/index.ts',
      'modules/icon-library/index': './js/src/sdk/modules/icon-library/index.ts',
      'modules/user/index': './js/src/sdk/modules/user/index.ts',
      'modules/widget-manager/index': './js/src/sdk/modules/widget-manager/index.ts',
      'modules/wysiwyg/index': './js/src/sdk/modules/wysiwyg/index.ts',
      'utils/index': './js/src/sdk/utils/index.ts',
    },
    decorators: {
      version: 'legacy',
    },
  },
  plugins: [
    pluginReact(),
  ],
});
